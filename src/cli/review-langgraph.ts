import { runLangGraphReviewFromFile } from "../adapters/langgraph/run-langgraph-review";

function main(): void {
  const filePath = process.argv[2];

  if (!filePath) {
    throw new Error("Usage: npm run review:langgraph -- <artifact.json>");
  }

  const result = runLangGraphReviewFromFile(filePath);

  console.log(result.report);
  console.log("");
  console.log(`Audit artifact: ${result.artifactPath}`);
}

main();
