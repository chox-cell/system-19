import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { writeAuditLog } from "../../src/logging/audit-log";
import type { ReviewOutput } from "../../src/types/output";

describe("System-19 audit log", () => {
  const artifactPath = path.join(process.cwd(), "artifacts", "system-19-pr-999.json");

  afterEach(() => {
    if (fs.existsSync(artifactPath)) {
      fs.unlinkSync(artifactPath);
    }
  });

  it("writes an audit artifact and returns its path", () => {
    const output: ReviewOutput = {
      decision: "APPROVE",
      blessingScore: 92,
      qualityScore: 90,
      riskScore: 10,
      confidenceScore: 94,
      violations: [],
      summary: "Audit ok.",
      requiredActions: []
    };

    const filePath = writeAuditLog(
      "local/test-repo",
      999,
      "abc123",
      ["src/utils/math.ts"],
      output
    );

    expect(filePath).toBe(artifactPath);
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
