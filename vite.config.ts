import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { androidDownloadPath } from './lib/android-release.js';

export default defineConfig(({ mode }) => {
  // Only the public download URL is exposed. A blank override disables downloads.
  const configured = loadEnv(mode, process.cwd(), 'VITE_APK_DOWNLOAD_URL').VITE_APK_DOWNLOAD_URL;
  const apkDownloadUrl = configured === undefined ? androidDownloadPath : configured.trim();
  if (apkDownloadUrl && apkDownloadUrl !== androidDownloadPath) {
    let url: URL;
    try {
      url = new URL(apkDownloadUrl);
    } catch {
      throw new Error('VITE_APK_DOWNLOAD_URL must be the managed release path or a public HTTPS download URL.');
    }
    if (url.protocol !== 'https:' || url.username || url.password || url.hostname === 'play.google.com') {
      throw new Error('VITE_APK_DOWNLOAD_URL must be a public HTTPS APK download URL without credentials.');
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: [],
    define: {'import.meta.env.VITE_APK_DOWNLOAD_URL': JSON.stringify(apkDownloadUrl)},
    resolve: {alias: {'@': path.resolve(import.meta.dirname, '.')}},
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
