import fs from "node:fs";
import path from "node:path";
import { runReview } from "../engine/review-engine";
import { buildReport } from "../engine/report-engine";
import { loadSystem19Config } from "../config/load-config";
import type { ReviewInput } from "../types/input";

function main(): void {
  const fixtureName = process.argv[2];

  if (!fixtureName) {
    throw new Error("Usage: npm run review:fixture -- <fixture-file.json>");
  }

  const filePath = path.isAbsolute(fixtureName)
    ? fixtureName
    : path.join(process.cwd(), "tests", "fixtures", fixtureName);

  const raw = fs.readFileSync(filePath, "utf8");
  const input = JSON.parse(raw) as ReviewInput;

  input.config = input.config ?? loadSystem19Config();

  const output = runReview(input);
  const report = buildReport(output);

  console.log(report);
}

main();
