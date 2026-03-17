import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { runReview } from "../../src/engine/review-engine";
import type { ReviewInput } from "../../src/types/input";

function loadFixture(name: string): ReviewInput {
  const filePath = path.join(process.cwd(), "tests", "fixtures", name);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ReviewInput;
}

describe("System-19 review engine", () => {
  it("approves a safe refactor", () => {
    const input = loadFixture("safe-refactor.json");
    const output = runReview(input);

    expect(output.decision).toBe("APPROVE");
    expect(output.blessingScore).toBeGreaterThanOrEqual(85);
  });

  it("blocks risky auth change without tests due to combined high risk", () => {
    const input = loadFixture("auth-without-tests.json");
    const output = runReview(input);

    expect(["REVISE", "BLOCK"]).toContain(output.decision);
    expect(output.violations.length).toBeGreaterThan(0);
  });

  it("blocks db change without migration", () => {
    const input = loadFixture("db-without-migration.json");
    const output = runReview(input);

    expect(output.decision).toBe("BLOCK");
    expect(output.violations.some((v) => v.rule === "RULE-02")).toBe(true);
  });
});
