export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Violation {
  rule: string;
  severity: Severity;
  file: string;
  message: string;
  suggestedFix: string;
}
