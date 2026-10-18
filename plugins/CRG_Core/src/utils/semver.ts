import { VERSION } from "../index";

/**
 * Compares two semantic version strings.
 * @param a The first semantic version string.
 * @param b The second semantic version string.
 * @returns -1 if a < b, 1 if a > b, 0 if equal.
 */
export function compareSemver(a: string, b: string): -1 | 0 | 1 {
  const aSegments = a.split(".").map(Number);
  const bSegments = b.split(".").map(Number);
  for (let i = 0; i < Math.max(aSegments.length, bSegments.length); i++) {
    const diff = (aSegments[i] ?? 0) - (bSegments[i] ?? 0);

    if (diff !== 0) {
      return diff < 0 ? -1 : 1;
    }
  }

  return 0;
}

/**
 * Returns whether a specified minimum version requirement is met.
 * @param minVersion The minimum required semantic version string.
 * @returns True if the current version meets or exceeds the minimum version, false otherwise.
 */
export function minVer(minVersion: string): boolean {
  return compareSemver(VERSION, minVersion) >= 0;
}
