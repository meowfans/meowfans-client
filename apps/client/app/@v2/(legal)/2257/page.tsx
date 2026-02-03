'use client';

import { Separator } from '@workspace/ui/components/separator';
import moment from 'moment';

export default function Compliance2257Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">18 U.S.C. § 2257 Compliance</h1>
        <p className="text-lg text-zinc-400">
          Compliance statement regarding record-keeping requirements. Last updated: {moment().format('L')}
        </p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="lead text-xl text-zinc-300">
          In compliance with <strong>Title 18 U.S.C. §2257</strong> and
          <strong> 28 C.F.R. Part 75</strong>, this statement serves as our official record-keeping and compliance notice for visual
          depictions that may appear on <strong>MeowFans</strong>.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">1. Legal Age of Performers</h2>
          <p>
            All persons appearing in any visual content displayed on this Website were at least <strong>18 years of age or older</strong> at
            the time of production. Appropriate proof of age documentation has been obtained and is maintained.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">3. Records Custodian Information</h2>
          <p>
            The records required pursuant to 18 U.S.C. §2257 and 28 C.F.R. Part 75 for materials directly produced by MeowFans are kept by
            the designated Records Custodian at the following address:
          </p>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg my-4">
            <p className="font-semibold text-white">Records Custodian:</p>
            <p>MeowFans</p>
            <p>support@meowfans.app</p>
          </div>

          <p>Records are available for inspection by authorized government representatives during normal business hours.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For inquiries regarding this Compliance Statement:{' '}
            <a href="mailto:compliance@meowfans.app" className="text-indigo-400 hover:underline">
              compliance@meowfans.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
