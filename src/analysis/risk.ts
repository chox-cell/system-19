import type { Violation } from "../types/violations";

export function computeRiskScore(violations: Violation[]): number {
  let score = 0;

  for (const violation of violations) {
    if (violation.severity === "MEDIUM") score += 10;
    if (violation.severity === "HIGH") score += 25;
    if (violation.severity === "CRITICAL") score += 50;
  }

  return Math.min(100, score);
}
