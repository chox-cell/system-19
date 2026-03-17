import type { Violation } from "../types/violations";
import { isTestFile } from "../utils/files";

const CRITICAL_PATTERNS = ["auth/", "permissions/", "billing/", "middleware/", "api/"];

export function checkSensitiveChangeWithoutTests(files: string[]): Violation[] {
  const hasCritical = files.some((f) => CRITICAL_PATTERNS.some((p) => f.includes(p)));
  const hasTests = files.some((f) => isTestFile(f));

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
