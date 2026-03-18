import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("System-19 fixtures exist for local runner", () => {
  it("has safe-refactor fixture", () => {
    const filePath = path.join(process.cwd(), "tests", "fixtures", "safe-refactor.json");
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
