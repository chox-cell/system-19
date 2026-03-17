import { clamp } from "../utils/normalize";

export function computeBlessingScore(
  qualityScore: number,
  confidenceScore: number,
  riskScore: number
): number {
  const raw = qualityScore + confidenceScore - riskScore;
  return clamp(raw / 2, 0, 100);
}
