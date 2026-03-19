import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../../src/config/defaults";
import { mapLangGraphArtifactToReviewInput } from "../../../src/adapters/langgraph/mapper";
import type { LangGraphArtifact } from "../../../src/adapters/langgraph/types";

describe("LangGraph adapter mapper", () => {
  it("maps LangGraph artifact to ReviewInput", () => {
    const artifact: LangGraphArtifact = {
      runtime: "langgraph",
      graphName: "shipping-flow",
      nodeName: "coder-node",
      taskId: "task-1",
      repo: "demo/repo",
      prNumber: 44,
      changedFiles: ["src/api/orders.ts"],
      filePatches: [
        {
          file: "src/api/orders.ts",
          patch: "+export async function createOrder(input: any) {}"
        }
      ],
      testResults: {
        status: "unknown"
      }
    };

    const input = mapLangGraphArtifactToReviewInput(artifact, defaultConfig);

    expect(input.repo).toBe("demo/repo");
    expect(input.prNumber).toBe(44);
    expect(input.authorType).toBe("ai");
    expect(input.labels).toContain("langgraph");
  });
});
