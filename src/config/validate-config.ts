import type { System19Config } from "./types";

export function validateSystem19Config(config: System19Config): void {
  const { approve, revise } = config.thresholds;

  if (approve < 0 || approve > 100) {
    throw new Error("System-19 config invalid: thresholds.approve must be between 0 and 100.");
  }

  if (revise < 0 || revise > 100) {
    throw new Error("System-19 config invalid: thresholds.revise must be between 0 and 100.");
  }

  if (revise > approve) {
    throw new Error("System-19 config invalid: thresholds.revise cannot be greater than thresholds.approve.");
  }

  if (!config.labels?.approve || !config.labels?.revise || !config.labels?.block) {
    throw new Error("System-19 config invalid: labels.approve, labels.revise, and labels.block are required.");
  }
}
