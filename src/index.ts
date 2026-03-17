import * as core from "@actions/core";
import { getPullRequestData } from "./github/pull-request";
import { runReview } from "./engine/review-engine";
import { buildReport } from "./engine/report-engine";
import { postComment } from "./github/comment";
import { writeAuditLog } from "./logging/audit-log";

async function main(): Promise<void> {
  try {
    const testStatus = core.getInput("test-status") || "unknown";
    const pr = await getPullRequestData();

    const output = runReview({
      ...pr,
      testResults: {
        status: testStatus as "pass" | "fail" | "unknown"
      }
    });

    const report = buildReport(output);

    await postComment(report);
    writeAuditLog(output);

    console.log("System-19 finished successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    core.setFailed(message);
  }
}

void main();
