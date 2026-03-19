import path from "node:path";
import { describe, expect, it } from "vitest";
import { runCrewAIReviewFromFile } from "../../../src/adapters/crewai/run-crewai-review";

describe("CrewAI adapter runner", () => {
  it("runs a System-19 review from CrewAI artifact", () => {
    const filePath = path.join(
      process.cwd(),
      "tests",
      "fixtures",
      "crewai",
      "authz-risk.json"
    );

    const result = runCrewAIReviewFromFile(filePath);

    expect(result.report).toContain("System-19 Review");
    expect(result.artifactPath).toContain("artifacts");
  });
});
