'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function CreatorTermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white bg-clip-text bg-linear-to-r from-orange-400 to-amber-200 w-fit">
          Creator Terms of Use
        </h1>
        <p className="text-lg text-zinc-400">
          Governing Creators who upload, publish, or monetize Content on MeowFans. Last updated: {moment().format('L')}
        </p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        <section id="creator-eligibility" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">1. Creator Eligibility, Verification & KYC</h2>
          <p>
            Creators must be at least 18 years of age and provide accurate, verifiable identity documentation. Required verification may
            include government-issued ID, proof of address, and a live selfie to match ID.
          </p>
        </section>

        <section id="content-guidelines" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">2. Content Guidelines & Warranties</h2>
          <p>
            Creators must ensure that all Content is lawful, consensual, and does not infringe third-party rights. By uploading you warrant
            you have the necessary rights, releases, and consents from any person appearing in the Content.
          </p>
        </section>

        <section id="payouts-creators" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">5. Payments, Fees, Payouts & Holds</h2>
          <p>
            Creators receive payments via supported payout methods. The Platform charges fees and commissions as disclosed in account
            settings. Payments are subject to verification and may be placed on hold for charge-backs, disputes, suspected fraud, or legal
            requests.
          </p>
        </section>

        <section id="prohibited-creators" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">7. Prohibited Content & Conduct</h2>
          <p>
            The following are strictly prohibited: underage content, non-consensual acts, bestiality, graphic violence, trafficking,
            terrorism content, and any content that violates local criminal law.
          </p>
        </section>
      </div>
    </div>
  );
}
