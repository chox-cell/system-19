import fs from "node:fs";
import path from "node:path";
import type { ReviewOutput } from "../types/output";

export function writeAuditLog(
  repo: string,
  prNumber: number,
  sha: string,
  changedFiles: string[],
  output: ReviewOutput
): string {
  const payload = {
    repo,
    prNumber,
    commitSha: sha,
    decision: output.decision,
    blessingScore: output.blessingScore,
    qualityScore: output.qualityScore,
    riskScore: output.riskScore,
    confidenceScore: output.confidenceScore,
    violations: output.violations,
    changedFiles,
    summary: output.summary,
    requiredActions: output.requiredActions,
    timestamp: new Date().toISOString()
  };

  const dir = path.join(process.cwd(), "artifacts");
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `system-19-pr-${prNumber}.json`);
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf8");

  console.log(`System-19 audit artifact written to ${filePath}`);
  return filePath;
}
