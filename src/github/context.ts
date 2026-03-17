import * as github from "@actions/github";

export function getGithubContext() {
  return github.context;
}
