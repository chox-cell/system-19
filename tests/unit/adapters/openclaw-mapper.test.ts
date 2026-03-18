import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../../src/config/defaults";
import { mapOpenClawArtifactToReviewInput } from "../../../src/adapters/openclaw/mapper";
import type { OpenClawTaskArtifact } from "../../../src/adapters/openclaw/types";

describe("OpenClaw adapter mapper", () => {
  it("maps OpenClaw artifact to ReviewInput", () => {
    const artifact: OpenClawTaskArtifact = {
      runtime: "openclaw",
      agentName: "coder-agent",
      taskId: "task-1",
      repo: "demo/repo",
      prNumber: 12,
      changedFiles: ["src/auth/session.ts"],
      filePatches: [
        {
          file: "src/auth/session.ts",
          patch: "+const token: any = getToken();"
        }
      ],
      testResults: {
        status: "unknown"
      }
    };

    const input = mapOpenClawArtifactToReviewInput(artifact, defaultConfig);

    expect(input.repo).toBe("demo/repo");
    expect(input.prNumber).toBe(12);
    expect(input.authorType).toBe("ai");
    expect(input.changedFiles.length).toBe(1);
  });
});
