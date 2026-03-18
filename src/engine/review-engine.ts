import type { ReviewInput } from "../types/input";
import type { ReviewOutput } from "../types/output";
import type { Violation } from "../types/violations";

import { defaultConfig } from "../config/defaults";
import { classifyFiles } from "../parser/classifiers";

import { checkUnsafeTypeScript } from "../rules/rule-unsafe-typescript";
import { checkDbWithoutMigration } from "../rules/rule-db-without-migration";
import { checkFailingTests } from "../rules/rule-failing-tests";
import { checkSensitiveChangeWithoutTests } from "../rules/rule-sensitive-change-without-tests";
import { checkIncompleteChange } from "../rules/rule-incomplete-change";
import { checkBreakingRisk } from "../rules/rule-breaking-risk";

import { computeQualityScore } from "../analysis/quality";
import { computeRiskScore } from "../analysis/risk";
import { computeConfidenceScore } from "../analysis/confidence";
import { computeBlessingScore } from "../analysis/scoring";
import { decide } from "./decision-engine";

export function runReview(input: ReviewInput): ReviewOutput {
  const config = input.config ?? defaultConfig;

  const filteredFiles = input.changedFiles.filter(
    (file) => !(config.ignoredFiles ?? []).some((pattern) => file.includes(pattern))
  );

  const filteredPatches = input.filePatches.filter(
    (item) => !(config.ignoredFiles ?? []).some((pattern) => item.file.includes(pattern))
  );

  const categories = classifyFiles(filteredFiles, config);

  if (filteredFiles.length === 0) {
    return {
      decision: "APPROVE",
      blessingScore: 100,
      qualityScore: 100,
      riskScore: 0,
      confidenceScore: 100,
      violations: [],
      summary: "System-19 found no actionable files after applying ignore rules.",
      requiredActions: []
    };
  }

  const violations: Violation[] = [
    ...checkUnsafeTypeScript(filteredPatches),
    ...checkDbWithoutMigration(filteredFiles, config),
    ...checkFailingTests(input.testResults),
    ...checkSensitiveChangeWithoutTests(filteredFiles, config),
    ...checkIncompleteChange(filteredFiles, config),
    ...checkBreakingRisk(filteredFiles, config)
  ];

  const qualityScore = computeQualityScore(violations);
  const riskScore = computeRiskScore(violations);
  const confidenceScore = computeConfidenceScore({
    ...input,
    changedFiles: filteredFiles,
    filePatches: filteredPatches,
    config
  });
  const blessingScore = computeBlessingScore(qualityScore, confidenceScore, riskScore);
  const decision = decide(blessingScore, violations, config);

  return {
    decision,
    blessingScore,
    qualityScore,
    riskScore,
    confidenceScore,
    violations,
    summary: `System-19 completed PR review for categories: ${categories.join(", ") || "NONE"}.`,
    requiredActions: [...new Set(violations.map((v) => v.suggestedFix))]
  };
}
