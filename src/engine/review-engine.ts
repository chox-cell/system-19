import type { ReviewInput } from "../types/input";
import type { ReviewOutput } from "../types/output";
import type { Violation } from "../types/violations";

import { defaultConfig } from "../config/defaults";
import { classifyFiles } from "../parser/classifiers";
import { getActiveRulePacks } from "../rules/packs/registry";

import { computeQualityScore } from "../analysis/quality";
import { computeRiskScore } from "../analysis/risk";
import { computeConfidenceScore } from "../analysis/confidence";
import { computeBlessingScore } from "../analysis/scoring";
import { decide } from "./decision-engine";

export function runReview(input: ReviewInput): ReviewOutput {
  const config = input.config ?? defaultConfig;

  const filteredFiles = input.changedFiles.filter(
    (file) => !(config.ignoredFiles ?? []).some((p) => file.includes(p))
  );

  const filteredPatches = input.filePatches.filter(
    (item) => !(config.ignoredFiles ?? []).some((p) => item.file.includes(p))
  );

  if (filteredFiles.length === 0) {
    return {
      decision: "APPROVE",
      blessingScore: 100,
      qualityScore: 100,
      riskScore: 0,
      confidenceScore: 100,
      violations: [],
      summary: "No actionable files after ignore rules.",
      requiredActions: []
    };
  }

  classifyFiles(filteredFiles, config);

  const packs = getActiveRulePacks();

  let violations: Violation[] = [];

  for (const pack of packs) {
    const result = pack.run({
      ...input,
      changedFiles: filteredFiles,
      filePatches: filteredPatches,
      config
    });
    violations.push(...result);
  }

  const qualityScore = computeQualityScore(violations);
  const riskScore = computeRiskScore(violations);
  const confidenceScore = computeConfidenceScore(input);
  const blessingScore = computeBlessingScore(qualityScore, confidenceScore, riskScore);

  const decision = decide(blessingScore, violations, config);

  return {
    decision,
    blessingScore,
    qualityScore,
    riskScore,
    confidenceScore,
    violations,
    summary: `System-19 executed ${packs.length} rule packs.`,
    requiredActions: [...new Set(violations.map((v) => v.suggestedFix))]
  };
}
