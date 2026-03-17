import * as core from "@actions/core";
import { getGithubPrContext } from "./github/context";
import { getPullRequestData } from "./github/pull-request";
import { runReview } from "./engine/review-engine";
import { buildReport } from "./engine/report-engine";
import { postComment } from "./github/comment";
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

    const prContext = getGithubPrContext();

    const input = await getPullRequestData(token, prContext);
    input.testResults = { status: testStatusInput };

    const output = runReview(input);
    const report = buildReport(output);

    if (commentMode === "pr-comment") {
      await postComment(token, prContext, report);
    } else {
      console.log(report);
    }

    writeAuditLog(
      input.repo,
      input.prNumber,
      prContext.sha,
      input.changedFiles,
      output
    );

    console.log("System-19 finished successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    core.setFailed(message);
  }
}

void main();
