import type { ReviewInput } from "../../types/input";
import type { System19Config } from "../../config/types";
import type { LangGraphArtifact } from "./types";
import { mapGenericRuntimeArtifactToReviewInput } from "../base/mapper";

export function mapLangGraphArtifactToReviewInput(
  artifact: LangGraphArtifact,
  config: System19Config
): ReviewInput {
  return mapGenericRuntimeArtifactToReviewInput(
    {
      runtime: artifact.runtime,
      agentName: `${artifact.graphName}:${artifact.nodeName}`,
      taskId: artifact.taskId,
      repo: artifact.repo,
      prNumber: artifact.prNumber,
      changedFiles: artifact.changedFiles,
      filePatches: artifact.filePatches,
      testResults: artifact.testResults,
      metadata: artifact.metadata
    },
    config,
    ["langgraph", artifact.graphName, artifact.nodeName]
  );
}
