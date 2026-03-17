import type { TestResults } from "../types/input";
import type { Violation } from "../types/violations";

export function checkFailingTests(testResults?: TestResults): Violation[] {
  if (testResults?.status === "fail") {
    return [
      {
        rule: "RULE-03",
        severity: "CRITICAL",
        file: "tests",
        message: "Tests are failing.",
        suggestedFix: "Fix failing tests before merge."
      }
    ];
  }

  return [];
}
