import { runCrewAIReviewFromFile } from "../adapters/crewai/run-crewai-review";

function main(): void {
  const filePath = process.argv[2];

  if (!filePath) {
    throw new Error("Usage: npm run review:crewai -- <artifact.json>");
  }

  const result = runCrewAIReviewFromFile(filePath);

  console.log(result.report);
  console.log("");
  console.log(`Audit artifact: ${result.artifactPath}`);
}

main();
