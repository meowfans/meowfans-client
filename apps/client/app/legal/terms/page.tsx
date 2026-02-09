'use client';

import { ScrollText } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function TermsPage() {
  return (
    <LegalPageView title="Terms of Service" lastUpdated="February 2026" icon={ScrollText}>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the MeowFans platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to
        these terms, please do not use our services.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years of age (or the age of majority in your jurisdiction) to use MeowFans. We strictly enforce age
        verification for all participants.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any
        unauthorized use of your account.
      </p>

      <h2>4. Prohibited Content</h2>
      <p>
        MeowFans prohibits content that is illegal, non-consensual, or violates our community guidelines. Failure to comply will result in
        immediate account termination.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        MeowFans is provided &quot;as is&quot; without any warranties. We are not liable for any indirect, incidental, or consequential damages
        arising from your use of the platform.
      </p>
    </LegalPageView>
  );
}
