import path from "node:path";
import { describe, expect, it } from "vitest";
import { runOpenClawReviewFromFile } from "../../../src/adapters/openclaw/run-openclaw-review";

describe("OpenClaw adapter runner", () => {
  it("runs a System-19 review from OpenClaw artifact", () => {
    const filePath = path.join(
      process.cwd(),
      "tests",
      "fixtures",
      "openclaw",
      "auth-risk.json"
    );

    const result = runOpenClawReviewFromFile(filePath);

    expect(result.report).toContain("System-19 Review");
    expect(result.artifactPath).toContain("artifacts");
  });
});
