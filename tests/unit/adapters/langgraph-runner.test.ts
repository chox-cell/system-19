import path from "node:path";
import { describe, expect, it } from "vitest";
import { runLangGraphReviewFromFile } from "../../../src/adapters/langgraph/run-langgraph-review";

describe("LangGraph adapter runner", () => {
  it("runs a System-19 review from LangGraph artifact", () => {
    const filePath = path.join(
      process.cwd(),
      "tests",
      "fixtures",
      "langgraph",
      "api-risk.json"
    );

    const result = runLangGraphReviewFromFile(filePath);

    expect(result.report).toContain("System-19 Review");
    expect(result.artifactPath).toContain("artifacts");
  });
});
