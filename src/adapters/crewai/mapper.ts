import type { ReviewInput } from "../../types/input";
import type { AdapterContext } from "../sdk/types";
import type { CrewAIArtifact } from "./types";
import { mapGenericRuntimeArtifactToReviewInput } from "../base/mapper";

export function mapCrewAIArtifactToReviewInput(
  artifact: CrewAIArtifact,
  context: AdapterContext
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
    context.config,
    ["crewai", artifact.crewName, artifact.agentName, ...(context.extraLabels ?? [])]
  );
}
