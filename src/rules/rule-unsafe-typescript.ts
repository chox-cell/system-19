import type { FilePatch } from "../types/input";
import type { Violation } from "../types/violations";

export function checkUnsafeTypeScript(filePatches: FilePatch[]): Violation[] {
  const violations: Violation[] = [];
  const patterns = [": any", " as any", "@ts-ignore", "@ts-nocheck"];

  for (const item of filePatches) {
    if (!item.file.endsWith(".ts") && !item.file.endsWith(".tsx")) continue;

    for (const pattern of patterns) {
      if (item.patch.includes(pattern)) {
        violations.push({
          rule: "RULE-01",
          severity: "MEDIUM",
          file: item.file,
          message: `Unsafe TypeScript pattern detected: ${pattern}`,
          suggestedFix: "Replace unsafe typing with explicit strict types."
        });
      }
    }
  }

  return violations;
}
