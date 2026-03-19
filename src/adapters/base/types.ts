export interface RuntimeFilePatch {
  file: string;
  patch: string;
}

export interface RuntimeTestResults {
  status: "pass" | "fail" | "unknown";
  summary?: string;
}

export interface GenericRuntimeArtifact {
  runtime: string;
  agentName: string;
  taskId: string;
  repo?: string;
  prNumber?: number;
  changedFiles: string[];
  filePatches: RuntimeFilePatch[];
  testResults?: RuntimeTestResults;
  metadata?: Record<string, string>;
}
