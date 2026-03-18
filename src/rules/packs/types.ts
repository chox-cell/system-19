import type { ReviewInput } from "../../types/input";
import type { Violation } from "../../types/violations";

export interface RulePack {
  name: string;
  description: string;
  run: (input: ReviewInput) => Violation[];
}
