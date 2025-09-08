/**
 * Sanitizes a potentially unsafe URL.
 * Mirrors upstream React sanitizeUrl behavior.
 * @param inputUrl - The URL to sanitize.
 * @param baseUrl - The base URL to use for relative URLs.
 * @returns The normalized URL, or "#" if the URL is invalid or unsafe.
 */
export function sanitizeUrl(inputUrl: string, baseUrl: string): string {
  try {
    const url = new URL(inputUrl, baseUrl);
    if (url.protocol !== 'javascript:') {
      return url.href;
    }
  } catch {
    // invalid URL
  }
  return '#';
}
