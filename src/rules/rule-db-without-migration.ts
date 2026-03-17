import type { Violation } from "../types/violations";

export function checkDbWithoutMigration(files: string[]): Violation[] {
  const hasDbChange = files.some((f) =>
    ["prisma/", "drizzle/", ".sql", "schema.prisma"].some((p) => f.includes(p))
  );

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
