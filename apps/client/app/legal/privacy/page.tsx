'use client';

import { ShieldCheck } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function PrivacyPage() {
  return (
    <LegalPageView title="Privacy Policy" lastUpdated="February 2026" icon={ShieldCheck}>
      <h2>1. Information We Collect</h2>
      <p>
        MeowFans collects information you provide directly to us when you create an account, including your name, email address, and payment
        information.
      </p>

      <h2>2. Use of Information</h2>
      <p>
        We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with
        you about your account.
      </p>

      <h2>3. Data Sharing</h2>
      <p>
        We do not share your personal information with third parties except as required by law or to provide our services (e.g., payment
        processors).
      </p>

      <h2>4. Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to analyze trends, administer the website, and track users&apos; movements around the
        platform.
      </p>

      <h2>5. Security</h2>
      <p>
        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure,
        alteration, and destruction.
      </p>
    </LegalPageView>
  );
}
