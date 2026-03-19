import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../../src/config/defaults";
import { mapCrewAIArtifactToReviewInput } from "../../../src/adapters/crewai/mapper";
import type { CrewAIArtifact } from "../../../src/adapters/crewai/types";

describe("CrewAI adapter mapper", () => {
  it("maps CrewAI artifact to ReviewInput", () => {
    const artifact: CrewAIArtifact = {
      runtime: "crewai",
      crewName: "security-crew",
      agentName: "coder-agent",
      taskId: "task-1",
      repo: "demo/repo",
      prNumber: 88,
      changedFiles: ["src/permissions/roles.ts"],
      filePatches: [
        {
          file: "src/permissions/roles.ts",
          patch: "+export function allowAll(user: any) {}"
        }
      ],
      testResults: {
        status: "unknown"
      }
    };

    const input = mapCrewAIArtifactToReviewInput(artifact, {
      config: defaultConfig,
      extraLabels: ["crewai"]
    });

    expect(input.repo).toBe("demo/repo");
    expect(input.prNumber).toBe(88);
    expect(input.authorType).toBe("ai");
    expect(input.labels).toContain("crewai");
    expect(input.labels).toContain("security-crew");
  });
});
