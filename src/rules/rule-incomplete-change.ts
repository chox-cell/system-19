import type { Violation } from "../types/violations";
import type { System19Config } from "../config/types";
import { isTestFile } from "../utils/files";

export function checkIncompleteChange(
  files: string[],
  config: System19Config
): Violation[] {
  const codeFiles = files.filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
  const nonTestCodeFiles = codeFiles.filter((f) => !isTestFile(f, config.testPaths));
  const hasTests = files.some((f) => isTestFile(f, config.testPaths));

  if (nonTestCodeFiles.length > 0 && !hasTests) {
    return [
      {
        rule: "RULE-05",
        severity: "HIGH",
        file: nonTestCodeFiles[0] ?? "code-change",
        message: "Logic change may be incomplete due to missing tests.",
        suggestedFix: "Add test coverage or explain why tests are not needed."
      }
    ];
  }

  return [];
}
