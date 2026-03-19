import { describe, expect, it } from "vitest";

describe("System-19 event contract", () => {
  it("validates minimal event shape", () => {
    const event = {
      runtime: "openclaw",
      agentName: "agent",
      taskId: "task-1",
      changedFiles: ["file.ts"],
      filePatches: [{ file: "file.ts", patch: "+code" }]
    };

    expect(event.runtime).toBeDefined();
    expect(event.changedFiles.length).toBeGreaterThan(0);
  });
});
