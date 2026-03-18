import type { ReviewInput } from "../../types/input";
import type { System19Config } from "../../config/types";
import type { OpenClawTaskArtifact } from "./types";

export function mapOpenClawArtifactToReviewInput(
  artifact: OpenClawTaskArtifact,
  config: System19Config
): ReviewInput {
  return {
    repo: artifact.repo ?? `${artifact.runtime}/unknown-repo`,
    prNumber: artifact.prNumber ?? 0,
    diff: artifact.filePatches
      .map((item) => `FILE: ${item.file}\n${item.patch}`)
      .join("\n\n"),
    changedFiles: artifact.changedFiles,
    filePatches: artifact.filePatches,
    testResults: artifact.testResults ?? { status: "unknown" },
    authorType: "ai",
    labels: [artifact.runtime, artifact.agentName],
    config
  };
}
