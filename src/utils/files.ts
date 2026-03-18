export function matchesAnyPath(file: string, patterns: string[]): boolean {
  return patterns.some((pattern) => file.includes(pattern));
}

export function isTestFile(file: string, testPaths: string[]): boolean {
  return matchesAnyPath(file, testPaths);
}

export function isIgnoredFile(file: string, ignoredFiles: string[]): boolean {
  return matchesAnyPath(file, ignoredFiles);
}
