import type { Violation } from "../types/violations";
import type { Decision } from "../types/output";
import type { System19Config } from "../config/types";

export function decide(
  blessingScore: number,
  violations: Violation[],
  config: System19Config
): Decision {
  const critical = violations.some((v) => v.severity === "CRITICAL");
  const highCount = violations.filter((v) => v.severity === "HIGH").length;

  if (critical) return "BLOCK";
  if (highCount >= 2) return "BLOCK";
  if (highCount >= 1) return "REVISE";
  if (blessingScore >= config.thresholds.approve) return "APPROVE";
  if (blessingScore >= config.thresholds.revise) return "REVISE";
  return "BLOCK";
}
