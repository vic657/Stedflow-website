import React from 'react';
import { X, Bell, Mail } from 'lucide-react';
import { Modal } from './Modal';

export const IosAvailabilityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} labelledBy="ios-title">
    <button onClick={onClose} autoFocus className="absolute top-5 right-5 p-2 rounded-full text-[#5E7875] hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-[#234E53]" aria-label="Close iOS availability">
      <X className="w-5 h-5" />
    </button>
    <div className="w-12 h-12 rounded-2xl bg-[#B7EF4A]/30 flex items-center justify-center mb-5">
      <Bell className="w-6 h-6 text-[#234E53]" />
    </div>
    <h3 id="ios-title" className="text-2xl font-black text-[#173539] tracking-tight mb-3 pr-8">iOS availability</h3>
    <p className="text-sm text-[#5E7875] leading-relaxed mb-4">An iOS release date has not been announced. Check back here for availability information.</p>
    <div className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10 text-sm text-[#5E7875] mb-6">
      Email signup is not available on this page. No email address is collected and no place on a waitlist is reserved.
    </div>
    <a href="mailto:info@stedflo.com" className="inline-flex items-center gap-2 text-sm font-bold text-[#234E53] underline">
      <Mail className="w-4 h-4" />Contact support
    </a>
  </Modal>
);
