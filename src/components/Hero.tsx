import { ApkDownloadLink } from './ApkDownloadLink';
import React from 'react';
import { ShieldCheck, EyeOff, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenIosAvailability: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenIosAvailability }) => {
  const runwayDays = 14;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(183,239,74,0.3) 0%, rgba(240,248,164,0.15) 45%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(78,155,86,0.35) 0%, rgba(35,78,83,0.2) 60%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Animated Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-medium text-[#173539] mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7EF4A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4E9B56]"></span>
              </span>
              <span className="tracking-wide">The Calm Financial Companion</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#173539] leading-[1.08] mb-6 text-balance">
              Know exactly what’s safe to spend before{' '}
              <span className="relative inline-block text-[#234E53]">
                <span className="relative z-10 underline decoration-[#B7EF4A] decoration-4 underline-offset-6">
                  payday.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#5E7875] leading-relaxed max-w-2xl mb-8">
              Stedflo connects your shifts, salary, bills, and savings into one calm runway.
              No rigid spreadsheets, no guesswork—just total confidence in your daily cash flow.
            </p>

            {/* Dual Store Download CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              
              {/* Android APK download */}
              <ApkDownloadLink className="group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#173539] text-white hover:bg-[#234E53] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(23,53,57,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7EF4A]" />

              {/* iOS availability notice */}
              <button
                onClick={onOpenIosAvailability}
                className="group flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border border-[#173539]/15 text-[#173539] hover:border-[#173539]/30 hover:bg-[#F7F9F3] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 fill-current text-[#173539] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2.02.61-2.67 1.37-.58.67-.99 1.74-.86 2.78 1.02.08 2.02-.53 2.61-1.28z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider text-[#5E7875] font-medium">Availability</div>
                    <div className="text-sm font-bold tracking-tight text-[#173539]">iOS app</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#173539]/10 text-[#173539] px-2 py-0.5 rounded-full ml-1 font-mono">
                  Not available
                </span>
              </button>

            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#173539]/10 w-full text-xs text-[#5E7875] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>Plan Upcoming Bills</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>See Your Daily Runway</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>Built for Variable Income</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Phone Mockup with Ambient Glow */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Radiant Lime Glow Behind Device */}
            <div
              className="absolute -inset-4 sm:-inset-8 rounded-[48px] opacity-70 blur-2xl -z-10 transition-all duration-700"
              style={{
                background: 'radial-gradient(circle, rgba(183,239,74,0.35) 0%, rgba(35,78,83,0.2) 60%, transparent 80%)',
              }}
            />

            {/* Floating Micro-Badge 1: Bills Protected */}
            <div className="absolute -top-3 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md border border-[#173539]/10 shadow-[0_8px_24px_rgba(23,53,57,0.12)] rounded-2xl py-2 px-3.5 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-7 h-7 rounded-full bg-[#4E9B56]/15 flex items-center justify-center text-[#4E9B56]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#173539]">Bills Ring-Fenced</div>
                <div className="text-[10px] text-[#5E7875]">Example rent & WiFi plan</div>
              </div>
            </div>

            {/* Floating Micro-Badge 2: Safety Runway */}
            <div className="absolute -bottom-4 -right-2 sm:-right-6 z-20 bg-[#173539] text-white border border-[#234E53] shadow-[0_12px_30px_rgba(16,38,41,0.3)] rounded-2xl py-2 px-3.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#B7EF4A]/20 flex items-center justify-center text-[#B7EF4A]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{runwayDays}-Day Runway</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7EF4A]"></span>
                </div>
                <div className="text-[10px] text-neutral-300">Illustrative app preview</div>
              </div>
            </div>

            {/* Phone Hardware Chassis */}
            <div className="w-full max-w-[320px] sm:max-w-[340px] bg-[#102629] p-2.5 sm:p-3 rounded-[46px] shadow-[0_25px_60px_-15px_rgba(16,38,41,0.4),0_0_0_1px_rgba(255,255,255,0.12)] border-[4px] border-[#234E53]/70 relative">
              
              {/* Inside Phone Screen (Native App Viewport) */}
              <div className="rounded-[36px] overflow-hidden relative bg-[#F7F9F3] shadow-inner border border-[#173539]/10">
                <img
                  src="/assets/aistudio/stedflo-dashboard-gbp.png"
                  alt="Stedflo Mobile App Dashboard showing balances in British pounds"
                  className="w-full h-auto object-cover block rounded-[36px]"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
