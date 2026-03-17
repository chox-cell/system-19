import * as github from "@actions/github";
import type { GithubPrContext } from "./context";

const COMMENT_MARKER = "<!-- system-19-review -->";

export async function postComment(
  token: string,
  prContext: GithubPrContext,
  message: string
): Promise<void> {
  const octokit = github.getOctokit(token);

  const body = `${COMMENT_MARKER}\n${message}`;

  const comments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner: prContext.owner,
    repo: prContext.repo,
    issue_number: prContext.prNumber,
    per_page: 100
  });

  const existing = comments.find((comment) =>
    typeof comment.body === "string" && comment.body.includes(COMMENT_MARKER)
  );

  if (existing) {
    await octokit.rest.issues.updateComment({
      owner: prContext.owner,
      repo: prContext.repo,
      comment_id: existing.id,
      body
    });
    return;
  }

  await octokit.rest.issues.createComment({
    owner: prContext.owner,
    repo: prContext.repo,
    issue_number: prContext.prNumber,
    body
  });
}
