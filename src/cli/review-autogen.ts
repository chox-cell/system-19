import { runAutoGenReviewFromFile } from "../adapters/autogen/run-autogen-review";

function main(): void {
  const filePath = process.argv[2];

  if (!filePath) {
    throw new Error("Usage: npm run review:autogen -- <artifact.json>");
  }

  const result = runAutoGenReviewFromFile(filePath);

  console.log(result.report);
  console.log("");
  console.log(`Audit artifact: ${result.artifactPath}`);
}

main();
