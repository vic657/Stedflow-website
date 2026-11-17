import { useEffect, useState } from 'react';

const measurementId = 'G-GVCX8C4272';
const preferenceKey = 'stedflo.analytics.v1';
type Choice = 'accepted' | 'rejected' | null;
let started = false;

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(preferenceKey);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch { return null; }
}

function startAnalytics() {
  // Keep preview visits out of production reports; never load Google before consent.
  if (started || location.hostname !== 'stedflo.com') return;
  started = true;
  const browser = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  browser.dataLayer = browser.dataLayer || [];
  browser.gtag = function () { browser.dataLayer!.push(arguments); };
  browser.gtag('consent', 'default', {
    analytics_storage: 'granted', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  browser.gtag('js', new Date());
  browser.gtag('config', measurementId, {
    allow_google_signals: false, allow_ad_personalization_signals: false,
    page_location: 'https://stedflo.com/', page_referrer: '',
    cookie_domain: 'stedflo.com', cookie_flags: 'SameSite=Lax;Secure',
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (link && new URL(link.href).pathname.endsWith('.apk')) {
      browser.gtag?.('event', 'apk_download_click', { file_extension: 'apk' });
    }
  });
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice>(readChoice);
  const [open, setOpen] = useState(choice === null);
  useEffect(() => {
    if (choice === 'accepted') startAnalytics();
  }, [choice]);

  function choose(next: Exclude<Choice, null>) {
    try { localStorage.setItem(preferenceKey, next); } catch { /* Session choice still works. */ }
    if (next === 'rejected' && started) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
          for (const domain of ['', '; Domain=stedflo.com', '; Domain=.stedflo.com']) {
            document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
          }
        }
      }
      location.reload();
      return;
    }
    setChoice(next);
    setOpen(false);
  }

  return <>
    <div className="bg-[#173539] px-6 pb-6 text-center">
      <button className="text-xs text-white underline underline-offset-4" onClick={() => setOpen(true)}>Analytics preferences</button>
    </div>
    {open && <section aria-label="Analytics preferences" className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-xl rounded-2xl border border-[#173539]/20 bg-[#F7F9F3] p-5 shadow-xl">
      <h2 className="font-bold text-[#173539]">Optional website analytics</h2>
      <p className="mt-2 text-sm text-[#173539]">With your permission, Google Analytics uses cookies to help us understand visits and download link clicks. Rejecting keeps analytics off. You can change your choice using Analytics preferences in the footer.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => choose('rejected')} className="flex-1 rounded-xl border border-[#173539] px-4 py-3 text-sm font-bold text-[#173539]">Reject analytics</button>
        <button onClick={() => choose('accepted')} className="flex-1 rounded-xl border border-[#173539] bg-[#173539] px-4 py-3 text-sm font-bold text-white">Accept analytics</button>
      </div>
    </section>}
  </>;
}
