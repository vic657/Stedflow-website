import React, { useState } from 'react';
import { ShieldCheck, EyeOff, Zap, CheckCircle2, ChevronRight, Bell, Sparkles, TrendingUp, Calendar, Plus } from 'lucide-react';

interface HeroProps {
  onOpenIosModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenIosModal }) => {
  // Interactive Phone Simulator State
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [extraShiftsCount, setExtraShiftsCount] = useState(0);
  const [rentPaid, setRentPaid] = useState(false);

  // Currency rate
  const rate = currency === 'KES' ? 1 : 1 / 130;
  const currencySymbol = currency === 'KES' ? 'KES' : '$';

  // Base numbers in KES
  const baseSafeToSpend = 24800 + extraShiftsCount * 5600 - (rentPaid ? 0 : 0);
  const displaySafeToSpend = currency === 'KES' 
    ? baseSafeToSpend.toLocaleString()
    : Math.round(baseSafeToSpend * rate).toLocaleString();

  const safetyScore = Math.min(96, 88 + (extraShiftsCount * 3) + (rentPaid ? 4 : 0));
  const runwayDays = 14 + extraShiftsCount * 2;

  const handleLogShift = () => {
    setExtraShiftsCount(prev => prev + 1);
  };

  const handleToggleRent = () => {
    setRentPaid(prev => !prev);
  };

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
              
              {/* Google Play Store Badge */}
              <a
                href="https://play.google.com/store/apps/details?id=com.stedflo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#173539] text-white hover:bg-[#234E53] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(23,53,57,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7EF4A]"
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 fill-current text-[#B7EF4A] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.913V2.727c.18-.344.402-.656.609-.913zM15.207 13.414l2.424 2.425-11.758 6.786 9.334-9.211zm0-2.828L5.873 1.375l11.758 6.786-2.424 2.425zm1.414 1.414l3.146-1.815c1.026-.593 1.026-1.56 0-2.152l-3.146-1.816-2.122 2.122 2.122 2.122z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-300 font-medium">Get it on</div>
                  <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                    Google Play
                    <ChevronRight className="w-3.5 h-3.5 text-[#B7EF4A] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Apple App Store (Coming Soon) Badge */}
              <button
                onClick={onOpenIosModal}
                className="group flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border border-[#173539]/15 text-[#173539] hover:border-[#173539]/30 hover:bg-[#F7F9F3] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 fill-current text-[#173539] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2.02.61-2.67 1.37-.58.67-.99 1.74-.86 2.78 1.02.08 2.02-.53 2.61-1.28z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider text-[#5E7875] font-medium">Download on the</div>
                    <div className="text-sm font-bold tracking-tight text-[#173539]">App Store</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#173539]/10 text-[#173539] px-2 py-0.5 rounded-full ml-1 font-mono">
                  Coming Soon (iOS)
                </span>
              </button>

            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#173539]/10 w-full text-xs text-[#5E7875] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>Bank-Grade Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>Zero Ad-Broker Tracking</span>
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
                <div className="text-[10px] text-[#5E7875]">Rent & WiFi 100% Covered</div>
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
                <div className="text-[10px] text-neutral-300">Calm cash flow ahead</div>
              </div>
            </div>

            {/* Phone Hardware Chassis */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] bg-[#102629] p-3 sm:p-3.5 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(16,38,41,0.4),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-[#234E53]/60 relative">
              
              {/* Dynamic Island / Top Speaker */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700"></span>
              </div>

              {/* Inside Phone Screen (Native App Viewport) */}
              <div className="bg-[#F7F9F3] text-[#173539] rounded-[34px] overflow-hidden pt-8 pb-4 px-4 flex flex-col gap-3.5 border border-[#173539]/10 relative">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#173539]/70 px-1 pt-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* Currency interactive switch inside phone */}
                    <button
                      onClick={() => setCurrency(prev => prev === 'KES' ? 'USD' : 'KES')}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#173539]/10 hover:bg-[#173539]/15 font-mono text-[#173539] transition-colors"
                      title="Click to switch currency"
                    >
                      {currency} ⇄
                    </button>
                    <span className="text-[10px]">5G</span>
                    <div className="w-4 h-2 border border-[#173539]/70 rounded-sm p-0.5">
                      <div className="w-full h-full bg-[#173539]/80 rounded-2xs"></div>
                    </div>
                  </div>
                </div>

                {/* In-App Header */}
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#5E7875]">Stedflo Live Runway</div>
                    <div className="text-base font-extrabold text-[#173539] tracking-tight">Financial Safety</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#173539] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    SK
                  </div>
                </div>

                {/* Score & Runway Summary Card (Deep Midnight Ink) */}
                <div className="bg-gradient-to-br from-[#102629] via-[#173539] to-[#234E53] text-white p-4 rounded-2xl relative overflow-hidden shadow-md">
                  {/* Subtle inner radial glow */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#B7EF4A]/20 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B7EF4A] font-semibold">Payday Safety Runway</span>
                      <div className="text-xl sm:text-2xl font-black tracking-tight flex items-baseline gap-1 tabular-nums mt-0.5">
                        <span className="text-xs font-medium text-neutral-300">{currencySymbol}</span>
                        <span>{displaySafeToSpend}</span>
                      </div>
                      <span className="text-[11px] text-neutral-300">Safe to spend today</span>
                    </div>

                    {/* Safety Score Ring Gauge */}
                    <div className="relative flex flex-col items-center justify-center shrink-0">
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-14 h-14 -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r="22"
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          <circle
                            cx="28"
                            cy="28"
                            r="22"
                            stroke="#B7EF4A"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="138"
                            strokeDashoffset={138 - (138 * safetyScore) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="absolute text-sm font-black text-white tabular-nums">
                          {safetyScore}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#B7EF4A] font-medium mt-0.5">Safety Score</span>
                    </div>
                  </div>

                  {/* Runway Indicator Bar */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B7EF4A]"></span>
                      <span>Next Payday: <strong>14 Days</strong></span>
                    </span>
                    <span className="text-[#B7EF4A] font-medium text-[10px]">Commitments Safe ✓</span>
                  </div>
                </div>

                {/* Upcoming Bills Card */}
                <div className="bg-white rounded-2xl p-3 border border-[#173539]/10 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#173539]">
                      <Calendar className="w-3.5 h-3.5 text-[#234E53]" />
                      <span>Ring-Fenced Bills</span>
                    </div>
                    <span className="text-[10px] text-[#4E9B56] font-semibold bg-[#4E9B56]/10 px-2 py-0.5 rounded-full">
                      Protected
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
                      <div>
                        <div className="font-semibold text-[#173539]">House Rent</div>
                        <div className="text-[10px] text-[#5E7875]">Due in 4 days</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#173539] tabular-nums">
                          {currencySymbol} {currency === 'KES' ? '18,000' : '138'}
                        </span>
                        <button
                          onClick={handleToggleRent}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                            rentPaid ? 'bg-[#4E9B56] text-white' : 'bg-neutral-100 text-[#5E7875] hover:bg-neutral-200'
                          }`}
                          title="Click to toggle paid status"
                        >
                          {rentPaid ? 'Paid ✓' : 'Pay'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs py-0.5">
                      <div>
                        <div className="font-semibold text-[#173539]">WiFi Fiber</div>
                        <div className="text-[10px] text-[#5E7875]">Due in 9 days</div>
                      </div>
                      <span className="font-bold text-[#173539] tabular-nums">
                        {currencySymbol} {currency === 'KES' ? '3,500' : '27'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Shift Income Card */}
                <div className="bg-white rounded-2xl p-3 border border-[#173539]/10 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#173539]">
                      <TrendingUp className="w-3.5 h-3.5 text-[#4E9B56]" />
                      <span>Shift & Variable Income</span>
                    </div>
                    <button
                      onClick={handleLogShift}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#234E53] bg-[#B7EF4A]/30 hover:bg-[#B7EF4A]/50 px-2 py-0.5 rounded-full transition-colors active:scale-95"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>Log Shift</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-[#173539]">Night Shift (8 hrs)</div>
                        <div className="text-[10px] text-[#5E7875]">Auto-credited to runway</div>
                      </div>
                      <span className="font-bold text-[#4E9B56] tabular-nums">
                        +{currencySymbol} {currency === 'KES' ? '5,600' : '43'}
                      </span>
                    </div>
                    {extraShiftsCount > 0 && (
                      <div className="flex items-center justify-between text-xs bg-[#4E9B56]/5 p-1 rounded-md">
                        <div className="font-medium text-[#234E53]">Logged Extra Shift ({extraShiftsCount}x)</div>
                        <span className="font-bold text-[#4E9B56] tabular-nums">
                          +{currencySymbol} {currency === 'KES' ? (extraShiftsCount * 5600).toLocaleString() : Math.round(extraShiftsCount * 5600 * rate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Savings Cushion Target Ring / Bar */}
                <div className="bg-[#173539]/5 rounded-2xl p-3 border border-[#173539]/10">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#173539] mb-1.5">
                    <span>Emergency Cushion Goal</span>
                    <span className="text-[#4E9B56]">74% complete</span>
                  </div>
                  <div className="w-full h-2 bg-[#173539]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4E9B56] to-[#B7EF4A] rounded-full w-[74%] transition-all duration-500"></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-[#5E7875] mt-1">
                    <span>Target: {currencySymbol} {currency === 'KES' ? '50,000' : '385'}</span>
                    <span>Protected automatically</span>
                  </div>
                </div>

                {/* Bottom interactive guide cue */}
                <div className="text-center py-0.5">
                  <span className="text-[10px] text-[#5E7875] bg-white/80 border border-[#173539]/10 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                    <span>💡 Tap <strong>Log Shift</strong> or <strong>Pay</strong> to simulate runway</span>
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
