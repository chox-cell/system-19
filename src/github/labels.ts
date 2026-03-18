import * as github from "@actions/github";
import type { Decision } from "../types/output";
import type { GithubPrContext } from "./context";
import type { System19Config } from "../config/types";

function getDecisionLabel(decision: Decision, config: System19Config): string {
  if (decision === "APPROVE") return config.labels!.approve;
  if (decision === "REVISE") return config.labels!.revise;
  return config.labels!.block;
}

export async function syncDecisionLabel(
  token: string,
  prContext: GithubPrContext,
  decision: Decision,
  config: System19Config
): Promise<void> {
  const octokit = github.getOctokit(token);

  const desiredLabel = getDecisionLabel(decision, config);
  const managedLabels = [
    config.labels!.approve,
    config.labels!.revise,
    config.labels!.block
  ];

  const existing = await octokit.rest.issues.listLabelsOnIssue({
    owner: prContext.owner,
    repo: prContext.repo,
    issue_number: prContext.prNumber,
    per_page: 100
  });

  for (const label of existing.data) {
    const name = typeof label.name === "string" ? label.name : "";
    if (managedLabels.includes(name) && name !== desiredLabel) {
      try {
        await octokit.rest.issues.removeLabel({
          owner: prContext.owner,
          repo: prContext.repo,
          issue_number: prContext.prNumber,
          name
        });
      } catch {
        // ignore missing label removal issues
      }
    }
  }

  try {
    await octokit.rest.issues.addLabels({
      owner: prContext.owner,
      repo: prContext.repo,
      issue_number: prContext.prNumber,
      labels: [desiredLabel]
    });
  } catch {
    // ignore label creation failures for now
  }
}
