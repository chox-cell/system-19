export async function getPullRequestData() {
  return {
    repo: "local/test-repo",
    prNumber: 1,
    diff: "",
    changedFiles: ["src/auth/session.ts"],
    filePatches: [
      {
        file: "src/auth/session.ts",
        patch: "const value: any = {};"
      }
    ]
  };
}
