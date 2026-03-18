import type { ChangeCategory } from "../types/review";
import type { System19Config } from "../config/types";
import { isTestFile, matchesAnyPath, isIgnoredFile } from "../utils/files";

const CONFIG_PATTERNS = [".env", "config/", "settings/"];

export function classifyFiles(
  files: string[],
  config: System19Config
): ChangeCategory[] {
  const categories = new Set<ChangeCategory>();

  for (const file of files) {
    if (isIgnoredFile(file, config.ignoredFiles ?? [])) {
      continue;
    }

    if (isTestFile(file, config.testPaths)) categories.add("TEST_CHANGE");
    if (matchesAnyPath(file, config.dbPaths)) categories.add("DB_CHANGE");
    if (matchesAnyPath(file, config.criticalPaths)) {
      categories.add("CRITICAL_SYSTEM_CHANGE");
    }
    if (CONFIG_PATTERNS.some((p) => file.includes(p))) {
      categories.add("CONFIG_CHANGE");
    }

    categories.add("CODE_CHANGE");
  }

  return [...categories];
}
