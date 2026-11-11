import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Bell } from 'lucide-react';

interface IosWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IosWaitlistModal: React.FC<IosWaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [deviceModel, setDeviceModel] = useState('iPhone (iOS 17+)');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Store in localStorage for persistence
    try {
      const waitlist = JSON.parse(localStorage.getItem('stedflo_ios_waitlist') || '[]');
      waitlist.push({ email, deviceModel, date: new Date().toISOString() });
      localStorage.setItem('stedflo_ios_waitlist', JSON.stringify(waitlist));
    } catch {
      // ignore storage errors
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#173539]/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5E7875] hover:text-[#173539] hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234E53]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#B7EF4A]/30 text-[#173539] flex items-center justify-center mb-5">
              <Bell className="w-6 h-6 text-[#234E53]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173539]/5 text-[11px] font-semibold text-[#234E53] uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-[#4E9B56]" />
              <span>Apple App Store Priority Queue</span>
            </div>

            <h3 id="waitlist-title" className="text-2xl font-black text-[#173539] tracking-tight mb-2">
              Get Notified on iOS Launch
            </h3>
            <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
              The iOS build is currently under review with Apple. Join the priority waitlist to receive an early TestFlight beta invitation and Day-1 launch notification.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ios-email" className="block text-xs font-bold text-[#173539] uppercase tracking-wider mb-1.5">
                  Your Email Address
                </label>
                <input
                  id="ios-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#173539]/20 text-sm text-[#173539] placeholder-[#5E7875]/50 focus:outline-none focus:ring-2 focus:ring-[#234E53] focus:border-transparent transition-all"
                />
                {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
              </div>

              <div>
                <label htmlFor="device-model" className="block text-xs font-bold text-[#173539] uppercase tracking-wider mb-1.5">
                  Primary Device
                </label>
                <select
                  id="device-model"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#173539]/20 text-sm text-[#173539] bg-white focus:outline-none focus:ring-2 focus:ring-[#234E53] transition-all"
                >
                  <option value="iPhone (iOS 17+)">iPhone (iOS 17 / iOS 18)</option>
                  <option value="iPhone SE / Older">iPhone (iOS 16)</option>
                  <option value="iPad">iPadOS</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl bg-[#173539] hover:bg-[#234E53] active:scale-[0.99] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Join iOS Priority Waitlist</span>
                <Send className="w-4 h-4 text-[#B7EF4A]" />
              </button>

              <p className="text-[11px] text-center text-[#5E7875]">
                🔒 No spam. Only one notification email when iOS is available.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#4E9B56]/20 text-[#4E9B56] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#173539] tracking-tight mb-2">
              You're on the list!
            </h3>
            <p className="text-sm text-[#5E7875] leading-relaxed mb-6">
              We've reserved your spot for the iOS beta. As soon as the App Store approval clears, you'll receive the direct installation link at <strong className="text-[#173539]">{email}</strong>.
            </p>
            <div className="p-4 bg-[#F7F9F3] rounded-2xl border border-[#173539]/10 text-xs text-[#173539] mb-6">
              <span>Have an Android device? You can download Stedflo right now on </span>
              <a
                href="https://play.google.com/store/apps/details?id=com.stedflo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#234E53] underline ml-1"
              >
                Google Play Store →
              </a>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-[#173539] text-white font-semibold text-sm hover:bg-[#234E53] transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
