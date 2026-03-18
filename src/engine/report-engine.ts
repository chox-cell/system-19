import type { ReviewOutput } from "../types/output";

function buildHumanSummary(output: ReviewOutput): string {
  if (output.violations.length === 0) {
    return "No significant issues detected. This PR is safe to proceed based on current System-19 checks.";
  }

  const criticalCount = output.violations.filter((v) => v.severity === "CRITICAL").length;
  const highCount = output.violations.filter((v) => v.severity === "HIGH").length;
  const mediumCount = output.violations.filter((v) => v.severity === "MEDIUM").length;

  return [
    `System-19 detected ${output.violations.length} issue(s).`,
    `Critical: ${criticalCount}, High: ${highCount}, Medium: ${mediumCount}.`,
    `Decision rationale: ${output.decision} was selected based on policy violations, risk level, and Blessing Score.`
  ].join(" ");
}

export function buildReport(output: ReviewOutput): string {
  const issues =
    output.violations.length > 0
      ? output.violations
          .map((v) => `- [${v.rule}] ${v.message} (${v.file})`)
          .join("\n")
      : "- No major issues detected";

  const actions =
    output.requiredActions.length > 0
      ? output.requiredActions.map((a) => `- ${a}`).join("\n")
      : "- No action required";

  const smartSummary = buildHumanSummary(output);

  return [
    "## System-19 Review",
    "",
    `**Decision:** ${output.decision}`,
    `**Blessing Score:** ${output.blessingScore}`,
    "",
    `- Quality: ${output.qualityScore}`,
    `- Risk: ${output.riskScore}`,
    `- Confidence: ${output.confidenceScore}`,
    "",
    "### Smart Summary",
    smartSummary,
    "",
    "### Issues Detected",
    issues,
    "",
    "### Required Actions",
    actions
  ].join("\n");
}
