import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenIosModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenIosModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F9F3]/90 backdrop-blur-md border-b border-[#173539]/10 shadow-[0_4px_20px_rgba(23,53,57,0.04)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark / Official Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53] rounded-lg transition-transform hover:opacity-95"
            aria-label="Stedflo Home"
          >
            <img
              src="/assets/aistudio/stedflo-logo-horizontal_b2058b01.png"
              alt="Stedflo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Zone 2: Navigation Links (Single-line, unboxed, subtle hover) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#173539]/80">
            <a
              href="#features"
              className="hover:text-[#173539] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B7EF4A] decoration-2"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#173539] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B7EF4A] decoration-2"
            >
              How It Works
            </a>
            <a
              href="#difference"
              className="hover:text-[#173539] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B7EF4A] decoration-2"
            >
              The Difference
            </a>
            <a
              href="#personas"
              className="hover:text-[#173539] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B7EF4A] decoration-2"
            >
              Work Styles
            </a>
            <a
              href="#faq"
              className="hover:text-[#173539] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B7EF4A] decoration-2"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary Action & Quick Store Badges */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenIosModal}
              className="text-xs font-semibold text-[#234E53] hover:text-[#173539] px-2.5 py-1.5 transition-colors whitespace-nowrap inline-flex items-center gap-1 hover:underline underline-offset-2"
            >
              <span>iOS Waitlist</span>
              <span className="text-[10px] bg-[#B7EF4A]/40 text-[#173539] px-1.5 py-0.5 rounded font-mono font-medium">Soon</span>
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.stedflo.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173539] text-white text-xs font-semibold hover:bg-[#234E53] active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(23,53,57,0.18)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7EF4A]"
            >
              <svg className="w-4 h-4 fill-current text-[#B7EF4A]" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.913V2.727c.18-.344.402-.656.609-.913zM15.207 13.414l2.424 2.425-11.758 6.786 9.334-9.211zm0-2.828L5.873 1.375l11.758 6.786-2.424 2.425zm1.414 1.414l3.146-1.815c1.026-.593 1.026-1.56 0-2.152l-3.146-1.816-2.122 2.122 2.122 2.122z"/>
              </svg>
              <span>Get App</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.stedflo.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#173539] text-white text-xs font-semibold"
            >
              <span>Get App</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#173539] hover:bg-[#173539]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#173539]/10 bg-[#F7F9F3] px-6 py-5 shadow-xl transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#173539]">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#4E9B56] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#4E9B56] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#difference"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#4E9B56] transition-colors"
            >
              The Difference
            </a>
            <a
              href="#personas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#4E9B56] transition-colors"
            >
              Work Styles
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#4E9B56] transition-colors"
            >
              Frequently Asked Questions
            </a>
            <div className="pt-4 border-t border-[#173539]/10 flex flex-col gap-2.5">
              <a
                href="https://play.google.com/store/apps/details?id=com.stedflo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 rounded-xl bg-[#173539] text-white font-semibold text-sm hover:bg-[#234E53]"
              >
                Download on Google Play
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIosModal();
                }}
                className="w-full text-center py-2.5 px-4 rounded-xl bg-white border border-[#173539]/15 text-[#173539] font-semibold text-sm hover:bg-neutral-50"
              >
                Join iOS App Store Waitlist
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
