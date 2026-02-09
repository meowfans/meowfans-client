'use client';

import { Sparkles } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function CreatorTermsPage() {
  return (
    <LegalPageView title="Creator Terms" lastUpdated="February 2026" icon={Sparkles}>
      <p className="lead">As a creator on MeowFans, you agree to the following terms regarding content creation, ownership, and payouts.</p>

      <h2>1. Content Ownership</h2>
      <p>
        You retain all ownership rights to the content you upload. By posting content, you grant MeowFans a limited license to host and
        distribute that content to your authorized fans.
      </p>

      <h2>2. Compensation</h2>
      <p>
        Creators receive a percentage of total revenue generated from their content, as outlined in the current payout schedule. MeowFans
        retains a service fee for platform maintenance.
      </p>

      <h2>3. Verification Requirements</h2>
      <p>
        All creators must complete identity verification and provide a valid bank account for payouts. We reserve the right to hold funds
        pending verification.
      </p>

      <h2>4. Prohibited Content</h2>
      <p>
        Content must not violate any laws or our community standards. Non-consensual content, hate speech, and illegal activities are
        strictly prohibited.
      </p>
    </LegalPageView>
  );
}
