import fs from "node:fs";
import path from "node:path";
import { loadSystem19Config } from "../../config/load-config";
import { runReview } from "../../engine/review-engine";
import { buildReport } from "../../engine/report-engine";
import { writeAuditLog } from "../../logging/audit-log";
import { mapGenericRuntimeArtifactToReviewInput } from "./mapper";
import type { GenericRuntimeArtifact } from "./types";

export function runRuntimeReviewFromFile(
  filePath: string,
  extraLabels: string[] = []
): {
  report: string;
  artifactPath: string;
} {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  const raw = fs.readFileSync(absolutePath, "utf8");
  const artifact = JSON.parse(raw) as GenericRuntimeArtifact;

  const config = loadSystem19Config();
  const input = mapGenericRuntimeArtifactToReviewInput(artifact, config, extraLabels);
  const output = runReview(input);
  const report = buildReport(output);

  const auditPath = writeAuditLog(
    input.repo,
    input.prNumber,
    artifact.taskId,
    input.changedFiles,
    output
  );

  return {
    report,
    artifactPath: auditPath
  };
}
