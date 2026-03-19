import { runRuntimeReviewFromFile } from "../base/run-runtime-review";

export function runOpenClawReviewFromFile(filePath: string): {
  report: string;
  artifactPath: string;
} {
  return runRuntimeReviewFromFile(filePath, ["openclaw"]);
}
