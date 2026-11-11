import React from 'react';
import { ArrowDown, Check, ShieldCheck, Sparkles, Smartphone, Wallet, RefreshCw } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Log or Stream Your Income',
      desc: 'Whether you clock hourly shifts, collect freelance milestones, or receive a monthly salary on the 28th, input your earnings with zero friction. Stedflo adapts to single or multiple income streams.',
      highlight: 'Works with shifts, contracts & salaries'
    },
    {
      number: '02',
      title: 'Ring-Fence Your Commitments',
      desc: 'List your rent, utilities, subscriptions, and savings goals. Stedflo places them in an untouchable virtual safety vault so they are never accidentally spent on weekend plans.',
      highlight: '100% of upcoming bills protected'
    },
    {
      number: '03',
      title: 'Spend Your Daily Safe Runway',
      desc: 'Open the app any time to see one calm, definitive number: your Daily Safe-to-Spend. If the screen says KES 2,800 is safe today, tap your card with total guilt-free peace of mind.',
      highlight: 'Recalculates every midnight'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#F7F9F3] border-t border-[#173539]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-semibold text-[#234E53] uppercase tracking-wider mb-4">
            <span>Simple 3-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173539] tracking-tight mb-5 text-balance">
            From payday chaos to{' '}
            <span className="text-[#36656B]">complete clarity in 2 minutes.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E7875] leading-relaxed">
            No complex formulas or 40-category budgeting spreadsheets. Just 3 intuitive steps to take back control over your daily financial confidence.
          </p>
        </div>

        {/* 3 Step Process Cards with Connecting Visual Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-[#173539]/10 shadow-[0_4px_20px_rgba(23,53,57,0.03)] hover:shadow-[0_12px_32px_rgba(23,53,57,0.07)] transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-[#B7EF4A] bg-[#173539] px-3.5 py-1 rounded-2xl">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold text-[#4E9B56] bg-[#4E9B56]/10 px-2.5 py-1 rounded-full">
                    Step {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#173539] tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#234E53]">
                <Check className="w-4 h-4 text-[#4E9B56] shrink-0" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Runway Calculator Callout */}
        <div className="mt-16 bg-[#173539] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B7EF4A]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-wider font-mono text-[#B7EF4A] font-bold">
                The Core Equation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 mb-3">
                Income - (Upcoming Bills + Savings) ÷ Days Until Payday
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                That single math equation eliminates 99% of personal finance anxiety. You never have to do mental gymnastics in supermarket queues or before ordering lunch.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="https://play.google.com/store/apps/details?id=com.stedflo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#B7EF4A] text-[#102629] font-bold text-sm hover:bg-[#a6e038] active:scale-95 transition-all shadow-[0_4px_16px_rgba(183,239,74,0.3)]"
              >
                <span>Calculate Your Runway Free</span>
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
