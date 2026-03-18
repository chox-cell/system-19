import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { runReview } from "../../src/engine/review-engine";
import type { ReviewInput } from "../../src/types/input";

function loadFixture(name: string): ReviewInput {
  const filePath = path.join(process.cwd(), "tests", "fixtures", name);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ReviewInput;
}

describe("System-19 ignored files behavior", () => {
  it("ignores configured files from review", () => {
    const input = loadFixture("ignored-files.json");
    const output = runReview(input);

    expect(output.violations.length).toBe(0);
    expect(output.decision).toBe("APPROVE");
  });
});
