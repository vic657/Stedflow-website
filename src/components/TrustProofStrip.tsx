import React from 'react';
import { ShieldCheck, Star, Sparkles, TrendingUp } from 'lucide-react';

export const TrustProofStrip: React.FC = () => {
  return (
    <div className="py-10 bg-white border-y border-[#173539]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
          
          {/* Stat 1 */}
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-[#173539] tracking-tight tabular-nums font-mono">
              KES 48.2M+
            </div>
            <div className="text-xs text-[#5E7875] font-medium mt-1">
              Monthly Commitments Protected
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-2 border-l border-neutral-100">
            <div className="text-2xl sm:text-3xl font-black text-[#4E9B56] tracking-tight tabular-nums font-mono">
              14,200+
            </div>
            <div className="text-xs text-[#5E7875] font-medium mt-1">
              Shifts & Freelance Milestones
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-2 border-l border-neutral-100">
            <div className="text-2xl sm:text-3xl font-black text-[#173539] tracking-tight tabular-nums font-mono">
              0%
            </div>
            <div className="text-xs text-[#5E7875] font-medium mt-1">
              Ad Tracking or Data Brokering
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-2 border-l border-neutral-100">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#173539] tracking-tight font-mono">
              <span>4.8</span>
              <div className="flex text-amber-400">
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="text-xs text-[#5E7875] font-medium mt-1">
              Google Play Store Rating
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
