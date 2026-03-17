import type { Violation } from "../types/violations";
import type { Decision } from "../types/output";

export function decide(blessingScore: number, violations: Violation[]): Decision {
  const critical = violations.some((v) => v.severity === "CRITICAL");
  const highCount = violations.filter((v) => v.severity === "HIGH").length;

  if (critical) return "BLOCK";
  if (highCount >= 2) return "BLOCK";
  if (highCount >= 1) return "REVISE";
  if (blessingScore >= 85) return "APPROVE";
  if (blessingScore >= 65) return "REVISE";
  return "BLOCK";
}
