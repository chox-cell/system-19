import type { RulePack } from "./types";
import type { Violation } from "../../types/violations";

function detectHeavyFiles(files: string[]): Violation[] {
  const large = files.filter((f) =>
    f.endsWith(".json") || f.endsWith(".log")
  );

  return large.map((file) => ({
    rule: "PERF-01",
    severity: "MEDIUM",
    file,
    message: "Potential heavy file added to repository.",
    suggestedFix: "Avoid committing large data files."
  }));
}

export const performanceRulePack: RulePack = {
  name: "performance",
  description: "Performance-related checks",
  run(input) {
    return detectHeavyFiles(input.changedFiles);
  }
};
