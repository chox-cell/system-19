import { runRuntimeReviewFromFile } from "../base/run-runtime-review";

export function runAutoGenReviewFromFile(filePath: string): {
  report: string;
  artifactPath: string;
} {
  return runRuntimeReviewFromFile(filePath, ["autogen"]);
}
