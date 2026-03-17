import type { Violation } from "../types/violations";
import { isTestFile } from "../utils/files";

export function checkIncompleteChange(files: string[]): Violation[] {
  const hasCode = files.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
  const hasTests = files.some((f) => isTestFile(f));

  if (hasCode && !hasTests) {
    return [
      {
        rule: "RULE-05",
        severity: "HIGH",
        file: "code-change",
        message: "Logic change may be incomplete due to missing tests.",
        suggestedFix: "Add test coverage or explain why tests are not needed."
      }
    ];
  }

  return [];
}
