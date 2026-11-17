import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageCircleQuestion } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqProps {
  onOpenIosAvailability: () => void;
}

export const FaqSection: React.FC<FaqProps> = ({ onOpenIosAvailability }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs: FaqItem[] = [
    {
      category: 'Calculations & Runway',
      question: 'How is the daily runway estimated?',
      answer: "The daily runway estimate subtracts upcoming bills and your savings buffer from available income, then spreads the remainder across the days until payday. The examples on this page are illustrative; your estimate depends on the information you enter."
    },
    {
      category: 'Downloads',
      question: 'How can I get the Android app?',
      answer: "Use the Android APK download button when it is available. If it says APK coming soon, a download link has not been published here yet. Contact support for current app pricing and feature availability."
    },
    {
      category: 'Product Comparison',
      question: 'How is this different from regular budgeting apps?',
      answer: "Stedflo focuses on planning ahead: account for upcoming bills and savings before estimating everyday spending. Keep the information up to date as income and expenses change."
    },
    {
      category: 'Privacy & Security',
      question: 'How is my personal and financial data secured?',
      answer: "This landing page does not ask for your financial records or create an account. Its iOS availability notice does not collect email addresses. For details about data handling in the mobile app, contact support before sharing personal or financial information."
    },
    {
      category: 'Platform Availability',
      question: 'When is the iOS / App Store version releasing?',
      answer: "An iOS release date has not been announced. This page does not offer an iOS signup or TestFlight invitation. Check back here for availability information."
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
            Everything you need to know about the Stedflo methodology, website privacy, and mobile availability.
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
                          onClick={onOpenIosAvailability}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#234E53] bg-[#B7EF4A]/30 hover:bg-[#B7EF4A]/50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>View iOS availability</span>
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
            <p className="text-xs sm:text-sm text-[#5E7875]">Contact the Stedflo team for product and availability questions.</p>
          </div>
          <a
            href="mailto:info@stedflo.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#173539]/15 text-xs font-semibold text-[#173539] hover:bg-neutral-50 transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-[#4E9B56]" />
            <span>info@stedflo.com</span>
          </a>
        </div>

      </div>
    </section>
  );
};
