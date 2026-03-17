import type { Violation } from "../types/violations";

const BREAKING_PATTERNS = ["api/", "types/", "schema", "auth/", "middleware/"];

export function checkBreakingRisk(files: string[]): Violation[] {
  const risky = files.filter((f) => BREAKING_PATTERNS.some((p) => f.includes(p)));

  return risky.map((file) => ({
    rule: "RULE-06",
    severity: "HIGH" as const,
    file,
    message: "Possible silent breaking risk detected.",
    suggestedFix: "Review contracts, consumers, and backward compatibility."
  }));
}
