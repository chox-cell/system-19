import * as github from "@actions/github";
import type { Decision } from "../types/output";
import type { GithubPrContext } from "./context";

function mapDecisionToConclusion(decision: Decision): "success" | "neutral" | "failure" {
  if (decision === "APPROVE") return "success";
  if (decision === "REVISE") return "neutral";
  return "failure";
}

export async function createStatusCheck(
  token: string,
  prContext: GithubPrContext,
  decision: Decision,
  summary: string
): Promise<void> {
  const octokit = github.getOctokit(token);

  await octokit.rest.checks.create({
    owner: prContext.owner,
    repo: prContext.repo,
    name: "System-19",
    head_sha: prContext.sha,
    status: "completed",
    conclusion: mapDecisionToConclusion(decision),
    output: {
      title: `System-19: ${decision}`,
      summary
    }
  });
}
