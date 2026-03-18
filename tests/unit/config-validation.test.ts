import { describe, expect, it } from "vitest";
import { validateSystem19Config } from "../../src/config/validate-config";
import { defaultConfig } from "../../src/config/defaults";

describe("System-19 config validation", () => {
  it("accepts valid default config", () => {
    expect(() => validateSystem19Config(defaultConfig)).not.toThrow();
  });

  it("rejects revise threshold above approve", () => {
    expect(() =>
      validateSystem19Config({
        ...defaultConfig,
        thresholds: {
          approve: 60,
          revise: 80
        }
      })
    ).toThrow();
  });

  it("rejects missing labels", () => {
    expect(() =>
      validateSystem19Config({
        ...defaultConfig,
        labels: {
          approve: "",
          revise: "",
          block: ""
        }
      })
    ).toThrow();
  });
});
