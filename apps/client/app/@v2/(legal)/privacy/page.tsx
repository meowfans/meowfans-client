'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Privacy Policy</h1>
        <p className="text-lg text-zinc-400">How we collect, use, and protect your data. Last updated: {moment().format('L')}</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="lead text-xl text-zinc-300">
          Effective Date: {moment().format('L')}. This Privacy Policy explains how MeowFans (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses,
          discloses, and protects personal information worldwide.
        </p>

        <section id="overview" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">1. Overview</h2>
          <p>
            MeowFans operates from India and serves users globally. We collect information necessary to operate the Platform, ensure legal
            compliance (including age verification), process payments, and deliver features. We are committed to privacy-by-design and data
            minimization.
          </p>
        </section>

        <section id="categories" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">2. Categories of Personal Information We Collect</h2>
          <p>We collect several types of information, including but not limited to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Account identifiers: email, display name, username;</li>
            <li>Verification documents: government IDs, selfies (for Creators); stored securely;</li>
            <li>Payment metadata: transaction IDs, last four digits (tokenized via Stripe/PayPal);</li>
            <li>Usage data: IP address, device and browser type, pages viewed, session timestamps;</li>
            <li>Content and associated metadata that you upload;</li>
            <li>Cookies and tracking identifiers.</li>
          </ul>
        </section>

        <section id="how-we-use" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">3. How We Use Personal Information</h2>
          <p>We use collected information for:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Providing and improving the Platform;</li>
            <li>Age and identity verification and compliance with laws (e.g., 2257);</li>
            <li>Processing payments and preventing fraud;</li>
            <li>Customer support and billing communications;</li>
            <li>Security, abuse prevention, and law enforcement requests;</li>
            <li>Personalization and recommendations (where consented).</li>
          </ul>
        </section>

        <section id="rights" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">9. Your Rights (Access, Portability, Erasure)</h2>
          <p>
            Depending on jurisdiction, you may have rights to access, correct, delete, restrict processing, or obtain copies of your data.
            To exercise rights, contact{' '}
            <a href="mailto:privacy@meowfans.app" className="text-indigo-400 hover:underline">
              privacy@meowfans.app
            </a>
            .
          </p>
        </section>

        <section id="contact-privacy" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">18. Contact & Complaints</h2>
          <p>
            Privacy contact:{' '}
            <a href="mailto:privacy@meowfans.app" className="text-indigo-400 hover:underline">
              privacy@meowfans.app
            </a>
            . For escalations, include account details and your preferred contact method.
          </p>
        </section>
      </div>
    </div>
  );
}
