import React from 'react';
import { Download } from 'lucide-react';

const apkDownloadUrl: string = import.meta.env.VITE_APK_DOWNLOAD_URL || '';

export const ApkDownloadLink: React.FC<{ className: string }> = ({ className }) => {
  const content = <><Download className="w-4 h-4 shrink-0" aria-hidden="true" /><span>{apkDownloadUrl ? 'Download Android APK' : 'APK coming soon'}</span></>;

  if (!apkDownloadUrl) {
    return <button type="button" disabled title="The Android APK download is not available yet." className={className + ' opacity-70 cursor-not-allowed'}>{content}</button>;
  }

  return <a href={apkDownloadUrl} download title="Download the signed Stedflo Android APK" className={className}>{content}</a>;
};
