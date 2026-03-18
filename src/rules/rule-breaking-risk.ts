import type { Violation } from "../types/violations";
import type { System19Config } from "../config/types";

const BREAKING_PATTERNS = ["api/", "types/", "schema", "auth/", "middleware/"];

export function checkBreakingRisk(
  files: string[],
  config: System19Config
): Violation[] {
  const combinedPatterns = [...BREAKING_PATTERNS, ...config.criticalPaths, ...config.dbPaths];
  const risky = files.filter((f) => combinedPatterns.some((p) => f.includes(p)));

  return risky.map((file) => ({
    rule: "RULE-06",
    severity: "HIGH" as const,
    file,
    message: "Possible silent breaking risk detected.",
    suggestedFix: "Review contracts, consumers, and backward compatibility."
  }));
}
