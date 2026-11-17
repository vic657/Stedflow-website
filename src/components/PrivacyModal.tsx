import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} labelledBy="privacy-title" className="max-w-2xl">
    <button onClick={onClose} autoFocus className="absolute top-5 right-5 p-2 rounded-full text-[#5E7875] hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-[#234E53]" aria-label="Close website privacy">
      <X className="w-5 h-5" />
    </button>
    <div className="w-12 h-12 rounded-2xl bg-[#4E9B56]/15 text-[#4E9B56] flex items-center justify-center mb-4">
      <ShieldCheck className="w-6 h-6" />
    </div>
    <h3 id="privacy-title" className="text-2xl font-black text-[#173539] tracking-tight mb-6 pr-8">Website privacy information</h3>
    <div className="space-y-5 text-sm text-[#5E7875] leading-relaxed">
      <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
        <h4 className="font-bold text-[#173539] mb-2">Optional analytics</h4>
        <p>Google Analytics loads only after you accept analytics. It uses cookies to measure website usage, including page visits and download link clicks; a click does not confirm an installation. Advertising consent remains denied. Your choice is stored in this browser. Use Analytics preferences in the footer to change your choice and turn analytics off. We do not send financial records or email addresses to Analytics. Learn more at <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noreferrer">Google’s privacy policy</a>.</p>
      </section>
      <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
        <h4 className="font-bold text-[#173539] mb-2">Exploring this page</h4>
        <p>The financial figures shown here are illustrative examples. This page does not ask for financial records, create accounts, or submit waitlist signups.</p>
      </section>
      <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
        <h4 className="font-bold text-[#173539] mb-2">External services</h4>
        <p>This page loads fonts from Google Fonts. The hosting provider and external download service may process connection information when you visit or follow a link. Contacting support opens your email application and only sends a message if you choose to send it.</p>
      </section>
      <section className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10">
        <h4 className="font-bold text-[#173539] mb-2">Mobile app data questions</h4>
        <p>This website notice does not describe the mobile app’s data handling. For the current app privacy information, contact <a href="mailto:info@stedflo.com" className="font-bold text-[#234E53] underline">info@stedflo.com</a> before sharing personal or financial information.</p>
      </section>
    </div>
    <div className="mt-8 pt-4 border-t border-[#173539]/10 flex justify-end">
      <button onClick={onClose} className="py-2.5 px-6 rounded-xl bg-[#173539] text-white font-semibold text-xs hover:bg-[#234E53]">Close</button>
    </div>
  </Modal>
);
