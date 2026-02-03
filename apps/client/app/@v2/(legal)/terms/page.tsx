'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Terms of Service</h1>
        <p className="text-lg text-zinc-400">General overview of terms for all users. Last updated: {moment().format('L')}</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        {/* ===== GENERAL TERMS ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">General Terms of Use</h2>
          <p>
            Welcome to MeowFans. By accessing or using our platform, you agree to comply with the following terms and conditions. These
            rules are designed to create a safe, enjoyable, and responsible environment for all users, including fans and creators.
          </p>
          <p>
            The platform reserves the right to update these terms at any time. Continued use after updates constitutes acceptance of the
            changes. Users are encouraged to review the terms periodically to remain informed.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Eligibility</h3>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Users must be at least 18 years old or the age of majority in their jurisdiction.</li>
            <li>Users must not be barred from using online services by local or national law.</li>
            <li>Accounts must be used for personal purposes; business or resale accounts require explicit permission.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">User Responsibilities</h3>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Maintain accurate and up-to-date account information.</li>
            <li>Do not share account credentials or allow unauthorized access.</li>
            <li>Respect other users and creators; harassment, threats, or abuse are prohibited.</li>
            <li>Comply with all copyright and intellectual property rights.</li>
            <li>Abide by local, national, and international laws.</li>
          </ul>
        </section>

        {/* ===== FANS TERMS ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Fans Terms of Use</h2>
          <p>
            As a fan, you gain access to creators’ content under specific guidelines. Your account privileges may be suspended or terminated
            for violations of these terms.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Purchases & Payments</h3>
          <p>
            All payments for subscriptions, tips, or pay-per-view content are final. Refunds may be issued only according to our payment
            policy. Users are responsible for all fees associated with their account.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Content Access</h3>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Purchased content is for personal use only; redistribution is prohibited.</li>
            <li>Users must respect NSFW warnings and age restrictions on content.</li>
            <li>Content may be removed or restricted at the creator’s discretion.</li>
          </ul>
        </section>

        {/* ===== CREATORS TERMS ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Creators Terms of Use</h2>
          <p>
            As a creator, you have the right to monetize and distribute your content through MeowFans. You are responsible for ensuring your
            content is legal, compliant, and appropriate.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Content Guidelines</h3>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Upload only content you own or have permission to use.</li>
            <li>Explicit content must be clearly marked and restricted to adult users.</li>
            <li>Do not promote illegal activity or third-party infringement.</li>
          </ul>
        </section>

        <section className="mb-12 border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">
            For the full, detailed legal text, please refer to the{' '}
            <a href="/general-terms" className="text-indigo-400 hover:underline">
              General Terms of Use
            </a>{' '}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
