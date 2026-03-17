import type { Violation } from "./violations";

export type Decision = "APPROVE" | "REVISE" | "BLOCK";

export interface ReviewOutput {
  decision: Decision;
  blessingScore: number;
  qualityScore: number;
  riskScore: number;
  confidenceScore: number;
  violations: Violation[];
  summary: string;
  requiredActions: string[];
}
