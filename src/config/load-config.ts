import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { defaultConfig } from "./defaults";
import type { System19Config } from "./types";

function mergeConfig(partial: Partial<System19Config>): System19Config {
  return {
    criticalPaths: partial.criticalPaths ?? defaultConfig.criticalPaths,
    dbPaths: partial.dbPaths ?? defaultConfig.dbPaths,
    testPaths: partial.testPaths ?? defaultConfig.testPaths,
    thresholds: {
      approve: partial.thresholds?.approve ?? defaultConfig.thresholds.approve,
      revise: partial.thresholds?.revise ?? defaultConfig.thresholds.revise
    },
    ignoredFiles: partial.ignoredFiles ?? defaultConfig.ignoredFiles
  };
}

export function loadSystem19Config(): System19Config {
  const configPath = path.join(process.cwd(), ".system19.yml");

  if (!fs.existsSync(configPath)) {
    return defaultConfig;
  }

  const raw = fs.readFileSync(configPath, "utf8");
  const parsed = YAML.parse(raw) as Partial<System19Config> | null;

  if (!parsed) {
    return defaultConfig;
  }

  return mergeConfig(parsed);
}
