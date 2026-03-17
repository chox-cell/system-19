import type { Violation } from "../types/violations";

export function computeQualityScore(violations: Violation[]): number {
  let score = 100;

  for (const violation of violations) {
    if (violation.severity === "MEDIUM") score -= 10;
    if (violation.severity === "HIGH") score -= 20;
    if (violation.severity === "CRITICAL") score -= 40;
  }

  return Math.max(0, score);
}
