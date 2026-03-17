export function isTestFile(file: string): boolean {
  return (
    file.includes("__tests__") ||
    file.endsWith(".spec.ts") ||
    file.endsWith(".test.ts")
  );
}
