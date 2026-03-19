export interface LangGraphArtifact {
  runtime: "langgraph";
  graphName: string;
  nodeName: string;
  taskId: string;
  repo?: string;
  prNumber?: number;
  changedFiles: string[];
  filePatches: Array<{
    file: string;
    patch: string;
  }>;
  testResults?: {
    status: "pass" | "fail" | "unknown";
    summary?: string;
  };
  metadata?: Record<string, string>;
}
