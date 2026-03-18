import type { System19Config } from "../config/types";

export interface FilePatch {
  file: string;
  patch: string;
}

export interface TestResults {
  status: "pass" | "fail" | "unknown";
  summary?: string;
}

export interface ReviewInput {
  repo: string;
  prNumber: number;
  diff: string;
  changedFiles: string[];
  filePatches: FilePatch[];
  testResults?: TestResults;
  labels?: string[];
  authorType?: "ai" | "human" | "unknown";
  config?: System19Config;
}
