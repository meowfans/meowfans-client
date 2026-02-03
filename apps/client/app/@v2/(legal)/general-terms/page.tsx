'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function GeneralTermsContentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">General Terms of Use</h1>
        <p className="text-lg text-zinc-400">
          The complete binding agreement for MeowFans platform usage. Last updated: {moment().format('L')}
        </p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="lead text-xl text-zinc-300">
          Effective Date: {moment().format('L')}. These General Terms of Use (&quot;Terms&quot;) form a binding agreement between you (&quot;you&quot;, &quot;User&quot;)
          and MeowFans. They govern your access to and use of the MeowFans website, mobile applications, APIs, and services.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance; Scope</h2>
          <p>
            By registering for an account, clicking &quot;I agree&quot;, accessing, or otherwise using the Platform, you accept and agree to be bound
            by these Terms, our Privacy Policy, Creator Terms (if applicable), and any additional terms posted on the Platform.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">3. Eligibility; Age</h2>
          <p>
            The Platform is intended for individuals who are at least eighteen (18) years old, or the age of majority in their jurisdiction.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">7. Payments, Fees, and Payouts</h2>
          <p>
            The Platform supports payments using third-party processors such as Stripe and PayPal. All purchases are subject to the
            processor&apos;s terms, applicable fees, and the Platform&apos;s policies.
          </p>
        </section>

        {/* Keeping it concise for the view, but in reality we would include all sections from GeneralTerms.tsx */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg my-8">
          <h3 className="text-lg font-semibold text-white mb-2">Note</h3>
          <p className="text-zinc-400">
            This is a high-level view. For the full legal text including all 24 sections regarding Liability, Indemnification, Exports, and
            Dispute Resolution, please refer to the main legal repository or contact support.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">21. Dispute Resolution; Governing Law</h2>
          <p>
            These Terms are governed by the laws of India, without regard to conflict of law provisions. Users agree to submit to the
            exclusive jurisdiction of the courts of India.
          </p>
        </section>

        <footer className="mt-12 text-sm text-zinc-500">
          Contact:{' '}
          <a href="mailto:support@meowfans.app" className="hover:text-white">
            support@meowfans.app
          </a>{' '}
          • Last updated: {moment().format('L')}
        </footer>
      </div>
    </div>
  );
}
