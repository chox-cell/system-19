import { runRuntimeReviewFromFile } from "../base/run-runtime-review";

export function runLangGraphReviewFromFile(filePath: string): {
  report: string;
  artifactPath: string;
} {
  return runRuntimeReviewFromFile(filePath, ["langgraph"]);
}
