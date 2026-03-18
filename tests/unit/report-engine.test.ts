import { describe, expect, it } from "vitest";
import { buildReport } from "../../src/engine/report-engine";
import type { ReviewOutput } from "../../src/types/output";

describe("System-19 report engine", () => {
  it("renders smart summary for clean output", () => {
    const output: ReviewOutput = {
      decision: "APPROVE",
      blessingScore: 95,
      qualityScore: 95,
      riskScore: 5,
      confidenceScore: 90,
      violations: [],
      summary: "Clean review.",
      requiredActions: []
    };

    const report = buildReport(output);

    expect(report).toContain("### Smart Summary");
    expect(report).toContain("No significant issues detected");
  });

  it("renders issue counts for risky output", () => {
    const output: ReviewOutput = {
      decision: "REVISE",
      blessingScore: 70,
      qualityScore: 75,
      riskScore: 40,
      confidenceScore: 65,
      violations: [
        {
          rule: "RULE-04",
          severity: "HIGH",
          file: "src/auth/session.ts",
          message: "Sensitive system change detected without test updates.",
          suggestedFix: "Add regression tests."
        }
      ],
      summary: "Risk detected.",
      requiredActions: ["Add regression tests."]
    };

    const report = buildReport(output);

    expect(report).toContain("System-19 detected 1 issue(s).");
    expect(report).toContain("Critical: 0, High: 1, Medium: 0.");
  });
});
