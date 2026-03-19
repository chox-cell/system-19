import type { ReviewInput } from "../../types/input";
import type { System19Config } from "../../config/types";
import type { OpenClawTaskArtifact } from "./types";
import { mapGenericRuntimeArtifactToReviewInput } from "../base/mapper";

export function mapOpenClawArtifactToReviewInput(
  artifact: OpenClawTaskArtifact,
  config: System19Config
): ReviewInput {
  return mapGenericRuntimeArtifactToReviewInput(artifact, config, ["openclaw"]);
}
