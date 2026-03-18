import * as core from "@actions/core";
import { loadSystem19Config } from "./config/load-config";
import { getGithubPrContext } from "./github/context";
import { getPullRequestData } from "./github/pull-request";
import { postComment } from "./github/comment";
import { createStatusCheck } from "./github/status-check";
import { writeStepSummary } from "./github/summary";
import { exposeArtifactPath } from "./github/artifact";
import { runReview } from "./engine/review-engine";
import { buildReport } from "./engine/report-engine";
import { writeAuditLog } from "./logging/audit-log";

async function main(): Promise<void> {
  try {
    const token = core.getInput("github-token", { required: true });
    const testStatusInput = core.getInput("test-status") || "unknown";
    const commentMode = core.getInput("comment-mode") || "pr-comment";

    if (
      testStatusInput !== "pass" &&
      testStatusInput !== "fail" &&
      testStatusInput !== "unknown"
    ) {
      throw new Error("Invalid test-status. Use pass | fail | unknown.");
    }

    const config = loadSystem19Config();
    const prContext = getGithubPrContext();

    const input = await getPullRequestData(token, prContext);
    input.testResults = { status: testStatusInput };
    input.config = config;

    const output = runReview(input);
    const report = buildReport(output);

    if (commentMode === "pr-comment") {
      await postComment(token, prContext, report);
    } else {
      console.log(report);
    }

    await createStatusCheck(token, prContext, output.decision, output.summary);
    await writeStepSummary(output);

    const artifactPath = writeAuditLog(
      input.repo,
      input.prNumber,
      prContext.sha,
      input.changedFiles,
      output
    );

    exposeArtifactPath(artifactPath);

    console.log("System-19 finished successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    core.setFailed(message);
  }
}

void main();
