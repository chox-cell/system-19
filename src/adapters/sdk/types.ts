import type { ReviewInput } from "../../types/input";
import type { System19Config } from "../../config/types";

export interface AdapterContext {
  config: System19Config;
  extraLabels?: string[];
}

export interface AdapterResult {
  report: string;
  artifactPath: string;
}

export interface RuntimeAdapter<TArtifact> {
  runtime: string;
  mapToReviewInput: (artifact: TArtifact, context: AdapterContext) => ReviewInput;
}
