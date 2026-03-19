import type { RuntimeAdapter } from "../sdk/types";
import type { CrewAIArtifact } from "./types";
import { mapCrewAIArtifactToReviewInput } from "./mapper";

export const crewAIAdapter: RuntimeAdapter<CrewAIArtifact> = {
  runtime: "crewai",
  mapToReviewInput: mapCrewAIArtifactToReviewInput
};
