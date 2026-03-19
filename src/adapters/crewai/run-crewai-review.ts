import { runAdapterFromFile } from "../sdk/create-adapter";
import { crewAIAdapter } from "./adapter";

export function runCrewAIReviewFromFile(filePath: string): {
  report: string;
  artifactPath: string;
} {
  return runAdapterFromFile(filePath, crewAIAdapter, ["crewai"]);
}
