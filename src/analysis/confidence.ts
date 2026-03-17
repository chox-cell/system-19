import type { ReviewInput } from "../types/input";

export function computeConfidenceScore(input: ReviewInput): number {
  let score = 60;

  if (input.changedFiles.length > 0) score += 10;
  if (input.testResults?.status === "pass") score += 20;
  if (input.filePatches.length > 0) score += 10;

  return Math.min(100, score);
}
