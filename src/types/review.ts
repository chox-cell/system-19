export type ChangeCategory =
  | "CODE_CHANGE"
  | "TEST_CHANGE"
  | "CONFIG_CHANGE"
  | "DB_CHANGE"
  | "CRITICAL_SYSTEM_CHANGE";

export interface ReviewContext {
  categories: ChangeCategory[];
}
