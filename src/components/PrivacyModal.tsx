import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#173539]/10 max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right p-2 rounded-full text-[#5E7875] hover:text-[#173539] hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="clear-both">
          <div className="w-12 h-12 rounded-2xl bg-[#4E9B56]/15 text-[#4E9B56] flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173539]/5 text-[11px] font-semibold text-[#234E53] uppercase tracking-wider mb-2">
            <span>Security Constitution</span>
          </div>

          <h3 id="privacy-title" className="text-2xl font-black text-[#173539] tracking-tight mb-2">
            Privacy Policy & Security Commitment
          </h3>
          <p className="text-xs text-[#5E7875] mb-6">
            Last Updated: January 2026 · Built with Bank-Grade Integrity
          </p>

          <div className="space-y-6 text-sm text-[#173539] leading-relaxed">
            
            <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
              <h4 className="font-bold text-[#173539] flex items-center gap-2 mb-2">
                <EyeOff className="w-4 h-4 text-[#4E9B56]" />
                <span>1. The Zero Ad-Broker Guarantee</span>
              </h4>
              <p className="text-xs text-[#5E7875] leading-relaxed">
                Stedflo will never sell, lease, or monetize your financial, personal, or shift data to third-party data brokers, marketing networks, credit bureaus, or loan solicitors. Your financial records are treated as confidential assets.
              </p>
            </section>

            <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
              <h4 className="font-bold text-[#173539] flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#4E9B56]" />
                <span>2. Hardware Keystore & Encryption</span>
              </h4>
              <p className="text-xs text-[#5E7875] leading-relaxed">
                All sensitive credentials, biometric tokens, and runway calculations are protected using AES-256 standard cryptographic encryption backed by Android Keystore and Apple Secure Enclave hardware. Data in transit is secured with TLS 1.3.
              </p>
            </section>

            <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
              <h4 className="font-bold text-[#173539] flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#4E9B56]" />
                <span>3. Data Sovereignty & Portability</span>
              </h4>
              <p className="text-xs text-[#5E7875] leading-relaxed">
                You maintain complete ownership of your data. At any time inside the Stedflo app settings, you can export your shift logs and bill records as CSV, or initiate full account deletion with immediate cryptographic purge across all servers.
              </p>
            </section>

            <section className="pt-2">
              <h4 className="font-bold text-[#173539] mb-2">Contact Security & Compliance</h4>
              <p className="text-xs text-[#5E7875]">
                For independent security audits, privacy inquiries, or data protection officer communications, reach our team directly at <a href="mailto:support@stedflo.com" className="font-bold text-[#234E53] underline">support@stedflo.com</a>.
              </p>
            </section>

          </div>

          <div className="mt-8 pt-4 border-t border-[#173539]/10 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-[#173539] text-white font-semibold text-xs hover:bg-[#234E53] transition-colors"
            >
              I Understand & Agree
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
