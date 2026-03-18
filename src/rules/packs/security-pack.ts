import type { RulePack } from "./types";
import type { Violation } from "../../types/violations";

function detectSecrets(files: string[]): Violation[] {
  const risky = files.filter((f) =>
    f.includes(".env") || f.includes("secret") || f.includes("key")
  );

  return risky.map((file) => ({
    rule: "SEC-01",
    severity: "CRITICAL",
    file,
    message: "Potential secret exposure detected.",
    suggestedFix: "Remove secrets and use environment variables."
  }));
}

export const securityRulePack: RulePack = {
  name: "security",
  description: "Security-focused rules",
  run(input) {
    return [
      ...detectSecrets(input.changedFiles)
    ];
  }
};
