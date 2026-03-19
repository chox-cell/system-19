import type { ReviewInput } from "../../types/input";
import type { System19Config } from "../../config/types";
import type { AutoGenArtifact } from "./types";
import { mapGenericRuntimeArtifactToReviewInput } from "../base/mapper";

export function mapAutoGenArtifactToReviewInput(
  artifact: AutoGenArtifact,
  config: System19Config
): ReviewInput {
  return mapGenericRuntimeArtifactToReviewInput(
    {
      runtime: artifact.runtime,
      agentName: artifact.agentName,
      taskId: artifact.taskId,
      repo: artifact.repo,
      prNumber: artifact.prNumber,
      changedFiles: artifact.changedFiles,
      filePatches: artifact.filePatches,
      testResults: artifact.testResults,
      metadata: artifact.metadata
    },
    config,
    ["autogen", artifact.teamName, artifact.agentName]
  );
}
