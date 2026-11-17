import { ApkDownloadLink } from './ApkDownloadLink';
import React from 'react';
import { Rocket, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onOpenIosAvailability: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenIosAvailability }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F9F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container (Deep Midnight Ink Gradient with Radiant Lime Glow) */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#102629] via-[#173539] to-[#234E53] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-[#234E53]">
          
          {/* Subtle radial glows */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(183,239,74,0.6) 0%, rgba(240,248,164,0.3) 50%, transparent 80%)',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(78,155,86,0.5) 0%, rgba(35,78,83,0.3) 60%, transparent 80%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Stedflo Official App Icon with Subtle Pulse Frame */}
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-[#B7EF4A]/30 rounded-[30px] blur-md animate-pulse"></div>
              <img
                src="/assets/aistudio/stedflo-app-icon_2838e1d9.png"
                alt="Stedflo App Icon"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] border-2 border-white/20 object-cover"
              />
            </div>

            {/* Pill kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#B7EF4A] mb-4">
              <Rocket className="w-3.5 h-3.5 text-[#B7EF4A]" />
              <span>Android APK · iOS Not Available</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-5 text-balance">
              Ready for calm confidence over your cash flow?
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl mb-10">
              Bring your shifts, freelance income, bills, and savings into a clearer plan for the days before payday.
            </p>

            {/* Dual Download Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              
              {/* Google Play Button */}
              <ApkDownloadLink className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-6 py-4 rounded-2xl bg-[#B7EF4A] text-[#102629] font-bold text-sm hover:bg-[#a6e038] active:scale-95 transition-all shadow-[0_4px_24px_rgba(183,239,74,0.35)]" />

              {/* App Store Button */}
              <button
                onClick={onOpenIosAvailability}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2.02.61-2.67 1.37-.58.67-.99 1.74-.86 2.78 1.02.08 2.02-.53 2.61-1.28z"/>
                </svg>
                <span>iOS availability</span>
                <span className="text-[10px] bg-[#B7EF4A]/30 text-[#B7EF4A] px-2 py-0.5 rounded-full font-mono">
                  Info
                </span>
              </button>

            </div>

            {/* Micro Trust notes */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7EF4A]" />
                Plan around payday
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B7EF4A]" />
                Track upcoming bills
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7EF4A]" />
                Explore income scenarios
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
