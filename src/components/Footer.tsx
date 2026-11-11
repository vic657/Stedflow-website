import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenIosModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal, onOpenIosModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@stedflo.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#102629] text-white pt-16 pb-12 border-t border-[#234E53]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Lockup & Value Statement */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block" aria-label="Stedflo Home">
              <img
                src="/assets/aistudio/stedflo-logo-horizontal-white_19fe58b6.png"
                alt="Stedflo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-neutral-300 max-w-sm leading-relaxed">
              The calm financial companion. Connecting your shifts, salary, bills, and savings into one predictive payday safety runway.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.stedflo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
              >
                <span>Google Play Store</span>
                <ArrowUpRight className="w-3 h-3 text-[#B7EF4A]" />
              </a>
              <button
                onClick={onOpenIosModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
              >
                <span>App Store (Coming Soon)</span>
              </button>
            </div>
          </div>

          {/* Col 3: Product Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#B7EF4A] font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Payday Safety Runway
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Shift & Hourly Tracker
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Smart Bill Reminders
                </a>
              </li>
              <li>
                <a href="#difference" className="hover:text-white transition-colors">
                  The Stedflo Difference
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Work Styles */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#B7EF4A] font-semibold mb-4">
              Work Styles
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Hourly & Shift Workers
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Freelance & Contractors
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Salaried Professionals
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#B7EF4A] font-semibold mb-4">
              Support & Inquiries
            </h4>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Have feedback, partnership ideas, or need support with your account?
            </p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-xl">
              <Mail className="w-4 h-4 text-[#B7EF4A] shrink-0" />
              <span className="text-xs text-neutral-200 select-all font-mono truncate">
                support@stedflo.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded-md hover:bg-white/10 text-neutral-300 hover:text-white transition-colors ml-auto"
                title="Copy email to clipboard"
                aria-label="Copy support email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#B7EF4A]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copied && (
              <span className="text-[10px] text-[#B7EF4A] block mt-1">Copied to clipboard!</span>
            )}
            <div className="mt-4">
              <button
                onClick={onOpenPrivacyModal}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-2 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#4E9B56]" />
                <span>Zero-Data-Selling Policy</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © 2026 Stedflo. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Security Commitment
            </button>
            <a
              href="mailto:support@stedflo.com"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
