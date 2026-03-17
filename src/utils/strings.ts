export function includesAny(target: string, patterns: string[]): boolean {
  return patterns.some((pattern) => target.includes(pattern));
}
