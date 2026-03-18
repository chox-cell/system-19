import * as core from "@actions/core";

export function exposeArtifactPath(filePath: string): void {
  core.setOutput("artifact-path", filePath);
  console.log(`System-19 artifact path exposed: ${filePath}`);
}
