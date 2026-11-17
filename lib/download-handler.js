import { androidRelease as release } from './android-release.js';

const checksumPath = release.downloadPath + '.sha256';
const etag = '"sha256-' + release.sha256 + '"';

function headers(extra = {}) {
  return new Headers({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; sandbox",
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'Strict-Transport-Security': 'max-age=31536000',
    'Cross-Origin-Resource-Policy': 'same-origin',
    ...extra,
  });
}

function error(status, message, extra = {}) {
  return new Response(message + '\n', {status, headers: headers({
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extra,
  })});
}

export function parseByteRange(value, size) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(value);
  if (!match || (!match[1] && !match[2])) return false;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return false;
    const length = Math.min(suffix, size);
    return {offset: size - length, length};
  }
  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || start > end) return false;
  return {offset: start, length: Math.min(end, size - 1) - start + 1};
}

export async function handleDownload(request, env) {
  const path = new URL(request.url).pathname;
  // No user-supplied storage key is ever passed to R2.
  if (path !== release.downloadPath && path !== checksumPath && path !== '/downloads/release.json') {
    return error(404, 'Download not found.');
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return error(405, 'Method not allowed.', {Allow: 'GET, HEAD'});
  }

  const isHead = request.method === 'HEAD';
  if (path === checksumPath) {
    return new Response(isHead ? null : release.sha256 + '  ' + release.filename + '\n', {headers: headers({
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="' + release.filename + '.sha256"',
      'Cache-Control': 'public, max-age=31536000, immutable',
    })});
  }
  if (path === '/downloads/release.json') {
    const {objectKey, md5, ...publicRelease} = release;
    return new Response(isHead ? null : JSON.stringify(publicRelease), {headers: headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    })});
  }

  if (!env.RELEASES) return error(503, 'Download temporarily unavailable.', {'Retry-After': '300'});
  try {
    const object = await env.RELEASES.head(release.objectKey);
    // Single-object upload: reject a wrong, incomplete, or unexpectedly replaced artifact.
    if (!object || object.size !== release.size || object.etag !== release.md5) {
      return error(503, 'Download temporarily unavailable.', {'Retry-After': '300'});
    }
    const responseHeaders = headers({
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Disposition': 'attachment; filename="' + release.filename + '"',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Accept-Ranges': 'bytes',
      'X-Checksum-SHA256': release.sha256,
      ETag: etag,
    });

    const conditional = request.headers.get('If-None-Match');
    if (conditional && conditional.split(',').some(value => value.trim() === etag || value.trim() === '*')) {
      return new Response(null, {status: 304, headers: responseHeaders});
    }
    const ifRange = request.headers.get('If-Range');
    const range = parseByteRange(!ifRange || ifRange === etag ? request.headers.get('Range') : null, release.size);
    if (range === false) return error(416, 'Requested range is not available.', {'Content-Range': 'bytes */' + release.size});
    const length = range ? range.length : release.size;
    responseHeaders.set('Content-Length', String(length));
    if (range) responseHeaders.set('Content-Range', 'bytes ' + range.offset + '-' + (range.offset + length - 1) + '/' + release.size);
    if (isHead) return new Response(null, {status: range ? 206 : 200, headers: responseHeaders});

    const data = await env.RELEASES.get(release.objectKey, range ? {range} : undefined);
    if (!data || data.size !== release.size || data.etag !== release.md5) {
      return error(503, 'Download temporarily unavailable.', {'Retry-After': '300'});
    }
    return new Response(data.body, {status: range ? 206 : 200, headers: responseHeaders});
  } catch {
    return error(503, 'Download temporarily unavailable.', {'Retry-After': '300'});
  }
}
