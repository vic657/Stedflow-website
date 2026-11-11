import React from 'react';
import { 
  Compass, 
  Clock, 
  BellRing, 
  Target, 
  Calculator, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle,
  Percent,
  CalendarCheck
} from 'lucide-react';

export const FeaturePillars: React.FC = () => {
  return (
    <section id="features" className="py-20 lg:py-28 relative bg-[#F7F9F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-semibold text-[#234E53] uppercase tracking-wider mb-4">
            <span>Core Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173539] tracking-tight mb-5 text-balance">
            Engineered for calm,{' '}
            <span className="text-[#4E9B56]">built for real income variability.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E7875] leading-relaxed">
            Every feature in Stedflo answers one simple question: <em>"Can I safely spend this today without jeopardizing my future commitments?"</em>
          </p>
        </div>

        {/* 6 Bento Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Payday Safety Runway (Feature Lead Card) */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#173539] text-[#B7EF4A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Payday Safety Runway
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
                Factors in pending rent, utilities, and emergency savings cushions to output your true daily disposable balance. If your runway says KES 2,500, it is 100% guilt-free.
              </p>
            </div>

            {/* Visual Runway Meter Snippet */}
            <div className="bg-[#F7F9F3] p-4 rounded-2xl border border-[#173539]/10">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#173539]">Live Runway Balance</span>
                <span className="text-[#4E9B56] font-bold">14 Days Clean</span>
              </div>
              <div className="w-full bg-[#173539]/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#4E9B56] h-full w-[82%] rounded-full"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#5E7875] mt-2">
                <span>Rent & Subscriptions Ring-Fenced</span>
                <span className="font-mono text-[#173539]">KES 24,800 Safe</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Shift & Hourly Tracking (With official illustration schedule_d51ab499.svg) */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#4E9B56]/15 text-[#4E9B56] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Shift & Hourly Tracking
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-4">
                Log irregular rosters, night differentials, and overtime rates. Stedflo instantly projects earned gross and net earnings straight into your safe runway before payday arrives.
              </p>
            </div>

            {/* Official schedule SVG Illustration */}
            <div className="bg-[#102629]/5 p-3 rounded-2xl border border-[#173539]/5 flex items-center justify-center overflow-hidden h-40">
              <img
                src="/assets/aistudio/schedule_d51ab499.svg"
                alt="Shift and schedule tracking illustration"
                className="max-h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Pillar 3: Smart Bill Reminders (With official illustration SmartphoneApplicationFeatures_a310831c.svg) */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#234E53]/15 text-[#234E53] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Smart Bill Reminders
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-4">
                Proactive notifications before recurring bills hit your bank or mobile money account. Never get surprised by an auto-renewal or late penalty again.
              </p>
            </div>

            {/* Official Smartphone Features SVG Illustration */}
            <div className="bg-[#102629]/5 p-3 rounded-2xl border border-[#173539]/5 flex items-center justify-center overflow-hidden h-40">
              <img
                src="/assets/aistudio/SmartphoneApplicationFeatures_a310831c.svg"
                alt="Smart notifications and mobile feature illustration"
                className="max-h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Pillar 4: Frictionless Savings Goals */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#75B06F]/20 text-[#4E9B56] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Frictionless Savings Goals
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
                Visual target rings that protect your emergency cushion and long-term targets without starving your daily routine or demanding impossible sacrifice.
              </p>
            </div>

            {/* Visual Ring Component */}
            <div className="bg-[#F7F9F3] p-4 rounded-2xl border border-[#173539]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5E7875]">Emergency Cushion</span>
                <div className="text-base font-bold text-[#173539]">KES 37,000 / 50,000</div>
                <span className="text-xs text-[#4E9B56] font-medium">+KES 4,200 this month</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#B7EF4A] border-t-[#234E53] flex items-center justify-center text-xs font-bold text-[#173539]">
                74%
              </div>
            </div>
          </div>

          {/* Pillar 5: Tax Planning & Net Take-Home (With official illustration finance_c491e411.svg) */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#B7EF4A]/40 text-[#173539] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Tax Planning & Net Take-Home
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-4">
                Freelancers and contractors can automatically ring-fence withholding tax and statutory deductions, eliminating painful surprises when filing season arrives.
              </p>
            </div>

            {/* Official Finance SVG Illustration */}
            <div className="bg-[#102629]/5 p-3 rounded-2xl border border-[#173539]/5 flex items-center justify-center overflow-hidden h-40">
              <img
                src="/assets/aistudio/finance_c491e411.svg"
                alt="Tax and revenue growth illustration"
                className="max-h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Pillar 6: Bank-Grade Privacy & Security */}
          <div className="rounded-3xl bg-white border border-[#173539]/10 p-8 shadow-[0_4px_24px_rgba(23,53,57,0.04)] hover:shadow-[0_12px_36px_rgba(23,53,57,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#173539] text-[#B7EF4A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                Bank-Grade Privacy & Security
              </h3>
              <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
                Your financial data belongs exclusively to you. Built with cryptographic password hashing, hardware device keystores, and a strict zero-ad-broker policy.
              </p>
            </div>

            {/* Security checklist badge */}
            <div className="bg-[#173539] text-white p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle className="w-4 h-4 text-[#B7EF4A] shrink-0" />
                <span>AES-256 On-Device Keystore Storage</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle className="w-4 h-4 text-[#B7EF4A] shrink-0" />
                <span>Zero Data Selling or Third-Party Ads</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle className="w-4 h-4 text-[#B7EF4A] shrink-0" />
                <span>Biometric Touch ID / Face ID Authentication</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
