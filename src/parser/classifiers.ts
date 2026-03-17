import type { ChangeCategory } from "../types/review";
import { isTestFile } from "../utils/files";

const DB_PATTERNS = ["prisma/", "drizzle/", "migrations/", ".sql", "schema.prisma"];
const CRITICAL_PATTERNS = ["auth/", "permissions/", "billing/", "middleware/", "api/"];
const CONFIG_PATTERNS = [".env", "config/", "settings/"];

export function classifyFiles(files: string[]): ChangeCategory[] {
  const categories = new Set<ChangeCategory>();

  for (const file of files) {
    if (isTestFile(file)) categories.add("TEST_CHANGE");
    if (DB_PATTERNS.some((p) => file.includes(p))) categories.add("DB_CHANGE");
    if (CRITICAL_PATTERNS.some((p) => file.includes(p))) categories.add("CRITICAL_SYSTEM_CHANGE");
    if (CONFIG_PATTERNS.some((p) => file.includes(p))) categories.add("CONFIG_CHANGE");
    categories.add("CODE_CHANGE");
  }

  return [...categories];
}
