import type { Violation } from "../types/violations";
import type { System19Config } from "../config/types";
import { isTestFile, matchesAnyPath } from "../utils/files";

export function checkSensitiveChangeWithoutTests(
  files: string[],
  config: System19Config
): Violation[] {
  const hasCritical = files.some((f) => matchesAnyPath(f, config.criticalPaths));
  const hasTests = files.some((f) => isTestFile(f, config.testPaths));

  if (hasCritical && !hasTests) {
    return [
      {
        rule: "RULE-04",
        severity: "HIGH",
        file: "critical-system",
        message: "Sensitive system change detected without test updates.",
        suggestedFix: "Add regression or integration tests for this change."
      }
    ];
  }

  return [];
}
