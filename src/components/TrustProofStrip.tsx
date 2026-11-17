import React from 'react';

export const TrustProofStrip: React.FC = () => (
  <div className="py-10 bg-white border-y border-[#173539]/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
        {[
          ['Income', 'Shifts, contracts & salaries'],
          ['Bills', 'Plan upcoming commitments'],
          ['Savings', 'Include your goals'],
          ['Runway', 'Estimate daily spending'],
        ].map(([title, description], index) => (
          <div key={title} className={'p-2' + (index ? ' border-l border-neutral-100' : '')}>
            <div className={'text-2xl sm:text-3xl font-black tracking-tight font-mono ' + (index === 1 ? 'text-[#4E9B56]' : 'text-[#173539]')}>{title}</div>
            <div className="text-xs text-[#5E7875] font-medium mt-1">{description}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
