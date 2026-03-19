import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../../src/config/defaults";
import { mapGenericRuntimeArtifactToReviewInput } from "../../../src/adapters/base/mapper";

describe("Generic adapter mapper", () => {
  it("maps generic runtime artifact to ReviewInput", () => {
    const input = mapGenericRuntimeArtifactToReviewInput(
      {
        runtime: "custom-runtime",
        agentName: "builder-agent",
        taskId: "task-1",
        repo: "demo/repo",
        prNumber: 55,
        changedFiles: ["src/app.ts"],
        filePatches: [
          {
            file: "src/app.ts",
            patch: "+const x: any = 1;"
          }
        ],
        testResults: {
          status: "unknown"
        }
      },
      defaultConfig,
      ["custom"]
    );

    expect(input.repo).toBe("demo/repo");
    expect(input.prNumber).toBe(55);
    expect(input.authorType).toBe("ai");
    expect(input.labels).toContain("custom-runtime");
    expect(input.labels).toContain("custom");
  });
});
