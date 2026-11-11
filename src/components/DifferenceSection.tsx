import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, TrendingUp, ShieldAlert, ShieldCheck } from 'lucide-react';

export const DifferenceSection: React.FC = () => {
  return (
    <section id="difference" className="py-20 lg:py-28 relative bg-[#F7F9F3] border-t border-[#173539]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-semibold text-[#234E53] uppercase tracking-wider mb-4">
            <span>The Stedflo Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173539] tracking-tight mb-5 text-balance">
            Traditional expense apps look backward.{' '}
            <span className="text-[#36656B]">Stedflo looks ahead.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E7875] leading-relaxed">
            Most finance apps wait until you have overspent to send a red alert. Stedflo takes your upcoming rent, bills, and savings off the table first—so your daily number is truly yours to enjoy.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: The Old Stressful Way */}
          <div className="rounded-3xl bg-white border border-rose-200/80 p-8 sm:p-10 shadow-[0_4px_24px_rgba(225,29,72,0.04)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[100px] pointer-events-none -z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-rose-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 tracking-tight">The Old Stressful Way</h3>
                    <p className="text-xs text-neutral-500">Backwards tracking & constant anxiety</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                  Reactive
                </span>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-neutral-800">
                      Bank balance guesswork
                    </strong>
                    <span className="text-xs text-neutral-500 leading-normal">
                      Seeing KES 30,000 in your account and assuming you can spend it, forgetting rent is due next Tuesday.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-neutral-800">
                      Rigid spreadsheets you abandon
                    </strong>
                    <span className="text-xs text-neutral-500 leading-normal">
                      Complex formulas requiring hours of manual entry that fall apart the minute your work hours shift.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-neutral-800">
                      Forgotten due dates & overdraft fees
                    </strong>
                    <span className="text-xs text-neutral-500 leading-normal">
                      Recurring annual subscriptions or utilities catch you off guard right before your next check.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-neutral-800">
                      Post-spend guilt & shame
                    </strong>
                    <span className="text-xs text-neutral-500 leading-normal">
                      Pie charts showing in red that you drank too much coffee last week—helpful for nothing today.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-100 text-xs text-neutral-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Result: Anxiety every time you tap your card in the final 10 days of the month.</span>
            </div>
          </div>

          {/* Card 2: The Stedflo Calm Way */}
          <div className="rounded-3xl bg-gradient-to-b from-[#102629] via-[#173539] to-[#102629] text-white border border-[#234E53] p-8 sm:p-10 shadow-[0_12px_40px_rgba(16,38,41,0.25)] relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Lime Glow in top corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B7EF4A]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#B7EF4A]/20 text-[#B7EF4A] flex items-center justify-center shrink-0 border border-[#B7EF4A]/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">The Stedflo Calm Way</h3>
                    <p className="text-xs text-neutral-300">Predictive runway & total spending freedom</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#B7EF4A] text-[#102629]">
                  Predictive
                </span>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#4E9B56]/30 text-[#B7EF4A] flex items-center justify-center shrink-0 mt-0.5 border border-[#4E9B56]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-white">
                      Real-time Payday Safety Runway
                    </strong>
                    <span className="text-xs text-neutral-300 leading-normal">
                      One clear number that subtracts future bills and savings before you spend. If it says KES 3,200 is safe today, it is 100% safe.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#4E9B56]/30 text-[#B7EF4A] flex items-center justify-center shrink-0 mt-0.5 border border-[#4E9B56]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-white">
                      Automated bill ring-fencing
                    </strong>
                    <span className="text-xs text-neutral-300 leading-normal">
                      Rent, WiFi, loan payments, and utilities are virtually walled off so they can never be accidentally spent on dinner.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#4E9B56]/30 text-[#B7EF4A] flex items-center justify-center shrink-0 mt-0.5 border border-[#4E9B56]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-white">
                      Dynamic shift & variable earnings
                    </strong>
                    <span className="text-xs text-neutral-300 leading-normal">
                      Log hours, overtime rates, or freelance milestones with one tap. Watch your daily runway expand immediately.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#4E9B56]/30 text-[#B7EF4A] flex items-center justify-center shrink-0 mt-0.5 border border-[#4E9B56]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-white">
                      Calm proactive reminders
                    </strong>
                    <span className="text-xs text-neutral-300 leading-normal">
                      Gentle heads-ups 5 days and 2 days before bills clear, with your runway already adjusted to absorb them.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#B7EF4A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Result: Zero end-of-month panic. Total freedom and confidence in every purchase.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
