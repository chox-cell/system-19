import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../src/config/defaults";
import { decide } from "../../src/engine/decision-engine";

describe("System-19 config-aware thresholds", () => {
  it("approves when score meets approve threshold", () => {
    const decision = decide(90, [], defaultConfig);
    expect(decision).toBe("APPROVE");
  });

  it("revises when score is between revise and approve", () => {
    const decision = decide(70, [], defaultConfig);
    expect(decision).toBe("REVISE");
  });

  it("blocks when score is below revise threshold", () => {
    const decision = decide(40, [], defaultConfig);
    expect(decision).toBe("BLOCK");
  });
});
