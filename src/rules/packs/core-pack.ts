import type { RulePack } from "./types";
import { checkUnsafeTypeScript } from "../rule-unsafe-typescript";
import { checkDbWithoutMigration } from "../rule-db-without-migration";
import { checkFailingTests } from "../rule-failing-tests";
import { checkSensitiveChangeWithoutTests } from "../rule-sensitive-change-without-tests";
import { checkIncompleteChange } from "../rule-incomplete-change";
import { checkBreakingRisk } from "../rule-breaking-risk";

export const coreRulePack: RulePack = {
  name: "core",
  description: "Default System-19 enforcement rules",
  run(input) {
    const config = input.config!;

    return [
      ...checkUnsafeTypeScript(input.filePatches),
      ...checkDbWithoutMigration(input.changedFiles, config),
      ...checkFailingTests(input.testResults),
      ...checkSensitiveChangeWithoutTests(input.changedFiles, config),
      ...checkIncompleteChange(input.changedFiles, config),
      ...checkBreakingRisk(input.changedFiles, config)
    ];
  }
};
