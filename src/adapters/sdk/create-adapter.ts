import fs from "node:fs";
import path from "node:path";
import { buildReport } from "../../engine/report-engine";
import { runReview } from "../../engine/review-engine";
import { writeAuditLog } from "../../logging/audit-log";
import { loadSystem19Config } from "../../config/load-config";
import type { AdapterResult, RuntimeAdapter } from "./types";

export function runAdapterFromFile<TArtifact>(
  filePath: string,
  adapter: RuntimeAdapter<TArtifact>,
  extraLabels: string[] = []
): AdapterResult {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  const raw = fs.readFileSync(absolutePath, "utf8");
  const artifact = JSON.parse(raw) as TArtifact;

  const config = loadSystem19Config();
  const input = adapter.mapToReviewInput(artifact, {
    config,
    extraLabels
  });

  const output = runReview(input);
  const report = buildReport(output);

  const artifactPath = writeAuditLog(
    input.repo,
    input.prNumber,
    `${adapter.runtime}-task`,
    input.changedFiles,
    output
  );

  return {
    report,
    artifactPath
  };
}
