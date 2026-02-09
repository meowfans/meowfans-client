'use client';

import { Users } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function FanTermsPage() {
  return (
    <LegalPageView title="Fan Terms of Use" lastUpdated="February 2026" icon={Users}>
      <p className="lead">These Fan Terms govern your use of MeowFans as a subscriber or purchaser of content.</p>

      <h2>1. Subscriptions and Purchases</h2>
      <p>
        When you subscribe to a creator or purchase individual content, you agree to pay the fees specified at the time of purchase. All
        transactions are final.
      </p>

      <h2>2. Content Usage</h2>
      <p>
        Content is provided for your personal, non-commercial use only. You may not download, distribute, or otherwise share content outside
        of the MeowFans platform.
      </p>

      <h2>3. Refund Policy</h2>
      <p>
        Refunds are generally not provided for digital content once it has been accessed or unlocked. If you have an issue with a purchase,
        please contact our support team.
      </p>

      <h2>4. Interaction with Creators</h2>
      <p>
        You agree to treat all creators with respect. Harassment, threats, or stalking behavior will result in immediate account termination
        without refund.
      </p>
    </LegalPageView>
  );
}
