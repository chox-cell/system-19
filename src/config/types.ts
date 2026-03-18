export interface System19Thresholds {
  approve: number;
  revise: number;
}

export interface System19Config {
  criticalPaths: string[];
  dbPaths: string[];
  testPaths: string[];
  thresholds: System19Thresholds;
  ignoredFiles?: string[];
}
