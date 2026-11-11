import React, { useState } from 'react';
import { Clock, Laptop, Briefcase, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { PersonaData } from '../types';

const personas: Record<string, PersonaData> = {
  shifts: {
    id: 'shifts',
    name: 'Hourly & Shift Workers',
    iconName: 'Clock',
    badge: 'Irregular Rosters Solved',
    title: 'Transform unpredictable shift rosters into unbreakable bill safety.',
    quote: '"I work 3 different shift differentials at Nairobi West Hospital. Before Stedflo, I never knew if my next check would cover rent. Now every hour logged updates my safe daily spend in real time."',
    scenario: 'Grace K., ICU Nurse & Ward Shift Coordinator',
    metrics: [
      { label: 'Safe Daily Spend', value: 'KES 2,400', sublabel: 'Protected for food & transport' },
      { label: 'Rent Coverage', value: '100% Ring-Fenced', sublabel: 'KES 22,000 locked 6 days early' },
      { label: 'Next Payday', value: '8 Days', sublabel: '+2 Night shifts pending payout' }
    ],
    features: [
      'Log day, night, weekend, and holiday differential rates with 1 tap',
      'Auto-projects gross and net earnings straight into your safe-to-spend runway',
      'Alerts you if scheduled shifts fall short of upcoming monthly commitments',
      'Cushions against last-minute roster cancellations or illness'
    ],
    sampleEntries: [
      { title: 'Night Shift Differential (12h)', category: 'Income', amount: '+KES 7,200', type: 'income', status: 'Completed' },
      { title: 'House Rent (Due in 6d)', category: 'Safe Commitment', amount: '-KES 22,000', type: 'bill', status: 'Ring-fenced' },
      { title: 'Emergency Cushion', category: 'Savings', amount: '+KES 1,500', type: 'savings', status: 'Transferred' },
    ]
  },
  freelance: {
    id: 'freelance',
    name: 'Freelance & Contractors',
    iconName: 'Laptop',
    badge: 'Feast & Famine Tamed',
    title: 'Master unpredictable invoice cycles with automated tax & runway buffers.',
    quote: '"When a client pays KES 150,000, other apps think I\'m rich. Stedflo immediately sweeps 30% into tax reserve and stretches the rest across a 60-day calm runway."',
    scenario: 'Brian M., Independent Product Designer & Dev',
    metrics: [
      { label: 'Cash Runway Buffer', value: '54 Days', sublabel: 'Covered through next 2 client cycles' },
      { label: 'Tax Ring-Fence', value: 'KES 45,000', sublabel: 'Zero filing surprises' },
      { label: 'Safe Daily Pace', value: 'KES 3,850', sublabel: 'Smooth predictable lifestyle' }
    ],
    features: [
      'Automated withholding tax and statutory deduction ring-fencing',
      'Smooths feast-or-famine invoice spikes into calm daily spending allowances',
      'Multi-month milestone runway tracking with client payment reminders',
      'Separates business project expenses from personal living allowances'
    ],
    sampleEntries: [
      { title: 'Brand Identity Project Milestone', category: 'Client Payout', amount: '+KES 120,000', type: 'income', status: 'Received' },
      { title: 'Income Tax Reserve (30%)', category: 'Tax Buffer', amount: '-KES 36,000', type: 'bill', status: 'Protected' },
      { title: 'Studio Software Suite', category: 'SaaS Tooling', amount: '-KES 8,500', type: 'bill', status: 'Ring-fenced' }
    ]
  },
  salaried: {
    id: 'salaried',
    name: 'Salaried Professionals',
    iconName: 'Briefcase',
    badge: 'End-of-Month Freedom',
    title: 'Pace your monthly salary so week 4 feels just as calm as week 1.',
    quote: '"My salary arrives on the 28th, but by the 20th of the following month I used to eat cheap noodles. Stedflo divided my true disposable income across 30 days. No more broke final week."',
    scenario: 'Amina O., Operations Lead at Fintech Scale-up',
    metrics: [
      { label: 'Safe Daily Spend', value: 'KES 3,100', sublabel: 'Evenly paced every single day' },
      { label: 'Fixed Bills Covered', value: 'KES 68,000', sublabel: 'Rent, WiFi, School, Insurance' },
      { label: 'Monthly Savings Rate', value: '22% of Net', sublabel: 'Compounding in high-yield fund' }
    ],
    features: [
      'Payday countdown ring shows exactly how much is safe to spend today',
      'Front-loads all scheduled bills on payday so you never accidentally spend rent',
      'Auto-resets your daily allowance at midnight based on actual balance',
      'Built-in splurge calculator: test a purchase before tapping your card'
    ],
    sampleEntries: [
      { title: 'Monthly Salary Credit', category: 'Primary Income', amount: '+KES 145,000', type: 'income', status: 'Credited' },
      { title: 'Apartment Lease & Service Charge', category: 'Living', amount: '-KES 42,000', type: 'bill', status: 'Ring-fenced' },
      { title: 'High-Yield Emergency Fund', category: 'Wealth Target', amount: '+KES 25,000', type: 'savings', status: 'Funded' }
    ]
  }
};

export const PersonaSwitcher: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shifts' | 'freelance' | 'salaried'>('shifts');
  const persona = personas[activeTab];

  return (
    <section id="personas" className="py-20 lg:py-28 relative bg-white border-t border-[#173539]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-semibold text-[#234E53] uppercase tracking-wider mb-4">
            <span>Adaptive Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173539] tracking-tight mb-5 text-balance">
            Adapted to <span className="text-[#36656B]">how you actually earn.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E7875] leading-relaxed">
            Whether your paycheck changes every week or arrives on the 28th, Stedflo configures your cash flow runway to match your real schedule.
          </p>
        </div>

        {/* 3 Clickable Persona Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto mb-12 p-1.5 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53] ${
              activeTab === 'shifts'
                ? 'bg-[#173539] text-white shadow-md'
                : 'text-[#173539]/70 hover:text-[#173539] hover:bg-white/60'
            }`}
          >
            <Clock className={`w-4 h-4 ${activeTab === 'shifts' ? 'text-[#B7EF4A]' : 'text-[#4E9B56]'}`} />
            <span>Hourly & Shifts</span>
          </button>

          <button
            onClick={() => setActiveTab('freelance')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53] ${
              activeTab === 'freelance'
                ? 'bg-[#173539] text-white shadow-md'
                : 'text-[#173539]/70 hover:text-[#173539] hover:bg-white/60'
            }`}
          >
            <Laptop className={`w-4 h-4 ${activeTab === 'freelance' ? 'text-[#B7EF4A]' : 'text-[#4E9B56]'}`} />
            <span>Freelance & Contracts</span>
          </button>

          <button
            onClick={() => setActiveTab('salaried')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53] ${
              activeTab === 'salaried'
                ? 'bg-[#173539] text-white shadow-md'
                : 'text-[#173539]/70 hover:text-[#173539] hover:bg-white/60'
            }`}
          >
            <Briefcase className={`w-4 h-4 ${activeTab === 'salaried' ? 'text-[#B7EF4A]' : 'text-[#4E9B56]'}`} />
            <span>Salaried Professional</span>
          </button>
        </div>

        {/* Dynamic Display Card */}
        <div className="bg-[#F7F9F3] border border-[#173539]/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(23,53,57,0.05)] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Explanatory copy & quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4E9B56]/15 text-[#234E53] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#4E9B56]" />
                <span>{persona.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#173539] tracking-tight leading-snug">
                {persona.title}
              </h3>

              {/* Quote from real worker */}
              <div className="p-4 rounded-2xl bg-white border border-[#173539]/10 relative">
                <p className="text-sm sm:text-base text-[#173539] italic mb-3">
                  {persona.quote}
                </p>
                <div className="text-xs font-semibold text-[#5E7875]">
                  — {persona.scenario}
                </div>
              </div>

              {/* Persona Features */}
              <ul className="space-y-3 pt-2">
                {persona.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#173539]">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9B56] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Col: Live Metric Dashboard Preview */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {persona.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-[#173539]/10 shadow-2xs">
                    <div className="text-[10px] uppercase font-bold text-[#5E7875] tracking-wider mb-1">
                      {metric.label}
                    </div>
                    <div className="text-lg sm:text-xl font-black text-[#173539] tracking-tight tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-[#4E9B56] font-medium mt-1">
                      {metric.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Sample Runway Ledger */}
              <div className="bg-[#173539] text-white p-5 rounded-2xl border border-[#234E53] shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="text-xs font-bold text-neutral-200">Simulated Flow Ledger</div>
                  <span className="text-[10px] font-mono text-[#B7EF4A] bg-[#B7EF4A]/10 px-2 py-0.5 rounded-full">
                    Auto-Synchronized
                  </span>
                </div>

                <div className="space-y-2.5">
                  {persona.sampleEntries.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-semibold text-white">{entry.title}</div>
                        <div className="text-[10px] text-neutral-400">{entry.category}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold tabular-nums ${
                          entry.type === 'income' ? 'text-[#B7EF4A]' : entry.type === 'savings' ? 'text-[#75B06F]' : 'text-neutral-300'
                        }`}>
                          {entry.amount}
                        </div>
                        <div className="text-[9px] text-neutral-400">{entry.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
