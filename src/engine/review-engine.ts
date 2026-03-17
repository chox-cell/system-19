import type { ReviewInput } from "../types/input";
import type { ReviewOutput } from "../types/output";
import type { Violation } from "../types/violations";

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
  const violations: Violation[] = [
    ...checkUnsafeTypeScript(input.filePatches),
    ...checkDbWithoutMigration(input.changedFiles),
    ...checkFailingTests(input.testResults),
    ...checkSensitiveChangeWithoutTests(input.changedFiles),
    ...checkIncompleteChange(input.changedFiles),
    ...checkBreakingRisk(input.changedFiles)
  ];

  const qualityScore = computeQualityScore(violations);
  const riskScore = computeRiskScore(violations);
  const confidenceScore = computeConfidenceScore(input);
  const blessingScore = computeBlessingScore(qualityScore, confidenceScore, riskScore);
  const decision = decide(blessingScore, violations);

  return {
    decision,
    blessingScore,
    qualityScore,
    riskScore,
    confidenceScore,
    violations,
    summary: "System-19 completed PR review.",
    requiredActions: [...new Set(violations.map((v) => v.suggestedFix))]
  };
}
