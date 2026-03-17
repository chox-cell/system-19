import * as github from "@actions/github";
import type { ReviewInput, FilePatch } from "../types/input";
import type { GithubPrContext } from "./context";

interface PullRequestFile {
  filename: string;
  patch?: string;
}

export async function getPullRequestData(
  token: string,
  prContext: GithubPrContext
): Promise<ReviewInput> {
  const octokit = github.getOctokit(token);

  const files: PullRequestFile[] = await octokit.paginate(
    octokit.rest.pulls.listFiles,
    {
      owner: prContext.owner,
      repo: prContext.repo,
      pull_number: prContext.prNumber,
      per_page: 100
    }
  );

  const changedFiles = files.map((file) => file.filename);
  const filePatches: FilePatch[] = files.map((file) => ({
    file: file.filename,
    patch: file.patch ?? ""
  }));

  const diff = filePatches
    .map((item) => `FILE: ${item.file}\n${item.patch}`)
    .join("\n\n");

  return {
    repo: `${prContext.owner}/${prContext.repo}`,
    prNumber: prContext.prNumber,
    diff,
    changedFiles,
    filePatches
  };
}
