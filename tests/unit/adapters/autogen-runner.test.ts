import path from "node:path";
import { describe, expect, it } from "vitest";
import { runAutoGenReviewFromFile } from "../../../src/adapters/autogen/run-autogen-review";

describe("AutoGen adapter runner", () => {
  it("runs a System-19 review from AutoGen artifact", () => {
    const filePath = path.join(
      process.cwd(),
      "tests",
      "fixtures",
      "autogen",
      "payment-risk.json"
    );

    const result = runAutoGenReviewFromFile(filePath);

    expect(result.report).toContain("System-19 Review");
    expect(result.artifactPath).toContain("artifacts");
  });
});
