import test from 'node:test';
import assert from 'node:assert/strict';
import { handleDownload } from '../lib/download-handler.js';
import { androidRelease as release } from '../lib/android-release.js';

const origin = 'https://stedflo.com';
const expectedObject = {size: release.size, etag: release.md5};
function request(path = release.downloadPath, options = {}) { return new Request(origin + path, options); }
function bucket(overrides = {}) {
  const calls = [];
  return {
    calls,
    async head(key) { calls.push(['head', key]); return {...expectedObject}; },
    async get(key, options) {
      calls.push(['get', key, options]);
      return {...expectedObject, body: new TextEncoder().encode('APK')};
    },
    ...overrides,
  };
}

test('serves only the pinned release as an APK attachment with checksum and security headers', async () => {
  const storage = bucket();
  const response = await handleDownload(request(), {RELEASES: storage});
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'application/vnd.android.package-archive');
  assert.equal(response.headers.get('X-Checksum-SHA256'), release.sha256);
  assert.equal(response.headers.get('Content-Length'), String(release.size));
  assert.match(response.headers.get('Content-Disposition'), /attachment; filename="stedflo-1.0.0.apk"/);
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.match(response.headers.get('Content-Security-Policy'), /default-src 'none'/);
  assert.equal(await response.text(), 'APK');
  assert(storage.calls.every(call => call[1] === release.objectKey));
});

test('unknown paths, traversal attempts, private files, and directory requests never reach storage', async () => {
  for (const path of ['/downloads/', '/downloads/.env', '/downloads/other.apk', '/downloads/%2e%2e%2f.env', '/downloads/android/' + release.filename]) {
    const storage = bucket();
    const response = await handleDownload(request(path), {RELEASES: storage});
    assert.equal(response.status, 404, path);
    assert.deepEqual(storage.calls, []);
  }
});

test('upload, delete, and other unsupported methods are denied without touching storage', async () => {
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    const storage = bucket();
    const response = await handleDownload(request(release.downloadPath, {method}), {RELEASES: storage});
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('Allow'), 'GET, HEAD');
    assert.deepEqual(storage.calls, []);
  }
});

test('HEAD provides download metadata without fetching a body', async () => {
  const storage = bucket();
  const response = await handleDownload(request(release.downloadPath, {method: 'HEAD'}), {RELEASES: storage});
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '');
  assert.equal(storage.calls.length, 1);
  assert.equal(storage.calls[0][0], 'head');
});

test('download fails closed when binding, object, length, or checksum identity is wrong', async () => {
  for (const env of [
    {},
    {RELEASES: bucket({async head() { return null; }})},
    {RELEASES: bucket({async head() { return {...expectedObject, size: 1}; }})},
    {RELEASES: bucket({async head() { return {...expectedObject, etag: 'wrong-object'}; }})},
    {RELEASES: bucket({async get() { return {...expectedObject, etag: 'changed-after-head'}; }})},
  ]) {
    const response = await handleDownload(request(), env);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(await response.text(), 'Download temporarily unavailable.\n');
  }
});

test('storage errors do not leak internal messages or credentials', async () => {
  const response = await handleDownload(request(), {RELEASES: bucket({async head() {
    throw new Error('sensitive internal storage information');
  }})});
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /sensitive|internal|storage information/);
});

test('byte ranges allow resumable downloads', async () => {
  for (const [header, expected] of [
    ['bytes=0-2', {offset: 0, length: 3}],
    ['bytes=-3', {offset: release.size - 3, length: 3}],
    ['bytes=' + (release.size - 3) + '-', {offset: release.size - 3, length: 3}],
  ]) {
    const storage = bucket();
    const response = await handleDownload(request(release.downloadPath, {headers: {Range: header}}), {RELEASES: storage});
    assert.equal(response.status, 206);
    assert.equal(response.headers.get('Content-Length'), '3');
    assert.deepEqual(storage.calls[1][2], {range: expected});
  }
});

test('invalid, unsatisfiable, and multipart ranges are rejected', async () => {
  for (const range of ['bytes=2-1', 'bytes=-0', 'bytes=0-1,4-5', 'bytes=', 'bytes=' + release.size + '-', 'bytes=9007199254740992-']) {
    const storage = bucket();
    const response = await handleDownload(request(release.downloadPath, {headers: {Range: range}}), {RELEASES: storage});
    assert.equal(response.status, 416, range);
    assert.equal(response.headers.get('Content-Range'), 'bytes */' + release.size);
    assert.equal(storage.calls.length, 1);
  }
});

test('If-Range with a different identity sends the full file', async () => {
  const storage = bucket();
  const response = await handleDownload(request(release.downloadPath, {headers: {Range: 'bytes=0-2', 'If-Range': '"different"'}}), {RELEASES: storage});
  assert.equal(response.status, 200);
  assert.equal(storage.calls[1][2], undefined);
});

test('conditional requests can reuse an already verified release', async () => {
  const storage = bucket();
  const response = await handleDownload(request(release.downloadPath, {headers: {'If-None-Match': '"sha256-' + release.sha256 + '"'}}), {RELEASES: storage});
  assert.equal(response.status, 304);
  assert.equal(storage.calls.length, 1);
});

test('checksum and public release metadata expose no storage configuration', async () => {
  const checksum = await handleDownload(request(release.downloadPath + '.sha256'), {});
  assert.equal(await checksum.text(), release.sha256 + '  ' + release.filename + '\n');
  const metadata = await handleDownload(request('/downloads/release.json'), {});
  const json = await metadata.json();
  assert.equal(json.applicationId, 'com.stedflo.app');
  assert.equal(json.sha256, release.sha256);
  assert.equal(json.objectKey, undefined);
  assert.equal(json.md5, undefined);
});
