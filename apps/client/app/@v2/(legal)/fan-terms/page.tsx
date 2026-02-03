'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function FanTermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Fan Terms of Use</h1>
        <p className="text-lg text-zinc-400">Specific rules and guidelines for Fans. Last updated: {moment().format('L')}</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="lead text-xl text-zinc-300">
          These Fans’ Terms supplement the General Terms and specifically govern the relationship between MeowFans and users who consume
          content (Fans), make purchases, or subscribe to Creators.
        </p>

        <section id="fan-account" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">1. Account Creation & Security</h2>
          <p>
            Fans may register using email or supported social providers. You agree to maintain accurate contact information and keep your
            credentials secure. Account sharing is prohibited unless expressly permitted by the Platform.
          </p>
        </section>

        <section id="purchases" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">2. Purchases, Subscriptions & Access Rules</h2>
          <p>
            When you purchase content or subscribe to a Creator, you receive a license to access that content per the terms displayed at
            purchase. Subscriptions are recurring and will automatically renew unless canceled.
          </p>
        </section>

        <section id="billing" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">3. Billing, Chargebacks & Fraud Prevention</h2>
          <p>
            All payments are processed by third-party processors. Chargebacks that are determined to be fraudulent may result in account
            suspension and recovery efforts.
          </p>
        </section>

        <section id="behavior" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">4. Community Behavior</h2>
          <p>
            Treat Creators and other Fans with respect. Do not harass, stalk, threaten, or coerce creators. Use platform reporting tools to
            flag abusive or illegal behavior.
          </p>
        </section>

        <section id="refunds-fans" className="mt-8">
          <h2 className="text-2xl font-semibold text-white">7. Refunds</h2>
          <p>
            Refunds are granted when required by law or at our discretion for technical failures. Where refunds are issued, MeowFans may
            deduct fees charged by the payment processor.
          </p>
        </section>
      </div>
    </div>
  );
}
