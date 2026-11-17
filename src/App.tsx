import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustProofStrip } from './components/TrustProofStrip';
import { DifferenceSection } from './components/DifferenceSection';
import { FeaturePillars } from './components/FeaturePillars';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { IosAvailabilityModal } from './components/IosAvailabilityModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AnalyticsConsent } from './components/AnalyticsConsent';

export default function App() {
  const [iosAvailabilityOpen, setIosAvailabilityOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9F3] text-[#173539] flex flex-col font-sans selection:bg-[#B7EF4A] selection:text-[#102629]">
      {/* Navigation Bar */}
      <Navbar onOpenIosAvailability={() => setIosAvailabilityOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Mockup */}
        <Hero onOpenIosAvailability={() => setIosAvailabilityOpen(true)} />

        {/* 2. Product Overview Strip */}
        <TrustProofStrip />

        {/* 3. The Stedflo Difference (Side-by-Side Comparison) */}
        <DifferenceSection />

        {/* 4. 6 Core Feature Pillars (with Official Vector Illustrations) */}
        <FeaturePillars />

        {/* 5. Interactive Persona Switcher (Hourly, Freelance, Salaried) */}
        <PersonaSwitcher />

        {/* 6. How It Works (3-Step Calm Runway Process) */}
        <HowItWorks />

        {/* 7. Frequently Asked Questions Accordion */}
        <FaqSection onOpenIosAvailability={() => setIosAvailabilityOpen(true)} />

        {/* 8. High-Impact Bottom CTA Banner */}
        <CtaBanner onOpenIosAvailability={() => setIosAvailabilityOpen(true)} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenIosAvailability={() => setIosAvailabilityOpen(true)}
      />

      <AnalyticsConsent />
      {/* Interactive Modals */}
      <IosAvailabilityModal
        isOpen={iosAvailabilityOpen}
        onClose={() => setIosAvailabilityOpen(false)}
      />

      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
