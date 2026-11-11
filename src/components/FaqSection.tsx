import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageCircleQuestion } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqProps {
  onOpenIosModal: () => void;
}

export const FaqSection: React.FC<FaqProps> = ({ onOpenIosModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs: FaqItem[] = [
    {
      category: 'Calculations & Runway',
      question: 'How does Stedflo calculate my Payday Safety score?',
      answer: 'Your Payday Safety score (from 0 to 100) measures whether your current cash and projected income comfortably cover your commitments until your next payday. Stedflo calculates your upcoming scheduled bills (rent, WiFi, utilities, debt), factors in your chosen savings rate, and divides the remaining disposable cash across the days left until payday. A score above 80 means all bills are safely ring-fenced with a healthy daily cushion.'
    },
    {
      category: 'Pricing',
      question: 'Is Stedflo free to use?',
      answer: 'Yes! Stedflo is free to download and start using immediately. The core features—including the live Payday Safety Runway, shift and hourly logging, bill ring-fencing, and daily safe-to-spend calculations—are 100% free with no annoying advertisements or paywalls on your essential cash flow.'
    },
    {
      category: 'Product Comparison',
      question: 'How is this different from regular budgeting apps?',
      answer: 'Traditional expense trackers are backward-looking and guilt-inducing: they show you historical pie charts of where you already failed. Stedflo is calm and forward-looking. By ring-fencing your upcoming rent and fixed bills first, Stedflo gives you one actionable number: your Daily Safe-to-Spend. If you spend within that daily runway, you never have to worry about running out of money before payday.'
    },
    {
      category: 'Privacy & Security',
      question: 'How is my personal and financial data secured?',
      answer: 'We treat your privacy with extreme discipline. Stedflo uses bank-grade AES-256 encryption and stores your credentials securely on your device keystore. Most importantly: we have a strict zero-ad-broker policy. We never sell, rent, or share your financial data with third-party data brokers, insurers, or advertisers.'
    },
    {
      category: 'Platform Availability',
      question: 'When is the iOS / App Store version releasing?',
      answer: 'Stedflo is currently live on Google Play for Android devices! The iOS build has been submitted to Apple and is undergoing App Store review. You can join the iOS Priority Waitlist using the button in the top navigation to receive an instant TestFlight invitation and be notified the exact hour it goes live on the App Store in Q1 2026.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-white border-t border-[#173539]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173539]/5 border border-[#173539]/10 text-xs font-semibold text-[#234E53] uppercase tracking-wider mb-4">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-[#4E9B56]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173539] tracking-tight mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#5E7875] max-w-xl mx-auto">
            Everything you need to know about the Stedflo methodology, privacy guarantees, and mobile release schedule.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#F7F9F3] border-[#173539]/20 shadow-sm'
                    : 'bg-white border-[#173539]/10 hover:border-[#173539]/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#173539] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#173539] text-[#B7EF4A] rotate-180'
                        : 'bg-[#173539]/5 text-[#173539]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5E7875] leading-relaxed border-t border-[#173539]/5">
                    <p>{faq.answer}</p>
                    {index === 4 && (
                      <div className="mt-4">
                        <button
                          onClick={onOpenIosModal}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#234E53] bg-[#B7EF4A]/30 hover:bg-[#B7EF4A]/50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>Join the iOS Waitlist</span>
                          <span>→</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-8 bg-[#F7F9F3] rounded-3xl border border-[#173539]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#173539]">Have a specific question?</h3>
            <p className="text-xs sm:text-sm text-[#5E7875]">Our product team responds personally to all questions within 24 hours.</p>
          </div>
          <a
            href="mailto:support@stedflo.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#173539]/15 text-xs font-semibold text-[#173539] hover:bg-neutral-50 transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-[#4E9B56]" />
            <span>support@stedflo.com</span>
          </a>
        </div>

      </div>
    </section>
  );
};
