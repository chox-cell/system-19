import type { ReviewOutput } from "../types/output";

export function writeAuditLog(output: ReviewOutput): void {
  console.log("SYSTEM-19 AUDIT LOG");
  console.log(JSON.stringify(output, null, 2));
}
