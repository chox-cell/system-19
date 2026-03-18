import { runOpenClawReviewFromFile } from "../adapters/openclaw/run-openclaw-review";

function main(): void {
  const filePath = process.argv[2];

  if (!filePath) {
    throw new Error("Usage: npm run review:openclaw -- <artifact.json>");
  }

  const result = runOpenClawReviewFromFile(filePath);

  console.log(result.report);
  console.log("");
  console.log(`Audit artifact: ${result.artifactPath}`);
}

main();
