import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../../src/config/defaults";
import { mapAutoGenArtifactToReviewInput } from "../../../src/adapters/autogen/mapper";
import type { AutoGenArtifact } from "../../../src/adapters/autogen/types";

describe("AutoGen adapter mapper", () => {
  it("maps AutoGen artifact to ReviewInput", () => {
    const artifact: AutoGenArtifact = {
      runtime: "autogen",
      teamName: "payments-team",
      agentName: "coder-agent",
      taskId: "task-1",
      repo: "demo/repo",
      prNumber: 77,
      changedFiles: ["src/billing/checkout.ts"],
      filePatches: [
        {
          file: "src/billing/checkout.ts",
          patch: "+export async function checkout(input: any) {}"
        }
      ],
      testResults: {
        status: "unknown"
      }
    };

    const input = mapAutoGenArtifactToReviewInput(artifact, defaultConfig);

    expect(input.repo).toBe("demo/repo");
    expect(input.prNumber).toBe(77);
    expect(input.authorType).toBe("ai");
    expect(input.labels).toContain("autogen");
    expect(input.labels).toContain("payments-team");
  });
});
