export const SDK_VERSION = '2.0.0';
export const API_VERSION = 'v2';
export const MIN_COMPATIBLE_VERSION = '2.0.0';

export function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major: major ?? 0, minor: minor ?? 0, patch: patch ?? 0 };
}

export function isCompatible(clientVersion: string, sdkVersion = SDK_VERSION): boolean {
  const client = parseVersion(clientVersion);
  const sdk = parseVersion(sdkVersion);
  return client.major === sdk.major && client.minor <= sdk.minor;
}

export function getVersionHeader(): Record<string, string> {
  return { 'X-SDK-Version': SDK_VERSION, 'X-API-Version': API_VERSION };
}
