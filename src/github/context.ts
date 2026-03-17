import * as github from "@actions/github";

export interface GithubPrContext {
  owner: string;
  repo: string;
  prNumber: number;
  sha: string;
}

export function getGithubPrContext(): GithubPrContext {
  const context = github.context;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const prNumber = context.payload.pull_request?.number;
  const sha = context.payload.pull_request?.head?.sha ?? context.sha;

  if (!prNumber) {
    throw new Error("System-19 must run on pull_request events.");
  }

  return {
    owner,
    repo,
    prNumber,
    sha
  };
}
