import * as core from "@actions/core";
import type { ReviewOutput } from "../types/output";

export async function writeStepSummary(output: ReviewOutput): Promise<void> {
  await core.summary
    .addHeading("System-19 Review")
    .addTable([
      [
        { data: "Decision", header: true },
        { data: output.decision, header: false }
      ],
      [
        { data: "Blessing Score", header: true },
        { data: String(output.blessingScore), header: false }
      ],
      [
        { data: "Quality", header: true },
        { data: String(output.qualityScore), header: false }
      ],
      [
        { data: "Risk", header: true },
        { data: String(output.riskScore), header: false }
      ],
      [
        { data: "Confidence", header: true },
        { data: String(output.confidenceScore), header: false }
      ]
    ])
    .addHeading("Summary", 2)
    .addRaw(output.summary)
    .addEOL()
    .addHeading("Required Actions", 2)
    .addList(
      output.requiredActions.length > 0
        ? output.requiredActions
        : ["No action required"]
    )
    .write();
}
