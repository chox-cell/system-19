import type { Violation } from "../types/violations";
import type { System19Config } from "../config/types";
import { matchesAnyPath } from "../utils/files";

export function checkDbWithoutMigration(
  files: string[],
  config: System19Config
): Violation[] {
  const hasDbChange = files.some((f) => matchesAnyPath(f, config.dbPaths));
  const hasMigration = files.some((f) => f.includes("migration"));

  if (hasDbChange && !hasMigration) {
    return [
      {
        rule: "RULE-02",
        severity: "CRITICAL",
        file: "database",
        message: "Database-related change detected without migration file.",
        suggestedFix: "Add the required migration before merge."
      }
    ];
  }

  return [];
}
