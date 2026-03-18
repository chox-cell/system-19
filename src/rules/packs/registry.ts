import { coreRulePack } from "./core-pack";
import { securityRulePack } from "./security-pack";
import { performanceRulePack } from "./performance-pack";
import type { RulePack } from "./types";

export function getActiveRulePacks(): RulePack[] {
  return [
    coreRulePack,
    securityRulePack,
    performanceRulePack
  ];
}
