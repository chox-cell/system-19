import type { ReviewOutput } from "../types/output";

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
    "### Issues Detected",
    issues,
    "",
    "### Required Actions",
    actions
  ].join("\n");
}
