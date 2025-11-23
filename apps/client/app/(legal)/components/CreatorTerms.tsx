import moment from 'moment';

const CreatorTerms = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-neutral-900 dark:text-gray-200 px-6 py-12">
      <article className="prose prose-slate dark:prose-invert max-w-5xl mx-auto">
        <h1 id="creators-terms">MeowFans — Creators’ Terms of Use</h1>
        <p className="lead">
          Effective Date: {moment().format('L')}. These Creators’ Terms govern Creators who upload, publish, or monetize Content on
          MeowFans. Creators must also comply with the General Terms and Privacy Policy.
        </p>

        <section id="creator-eligibility">
          <h2>1. Creator Eligibility, Verification & KYC</h2>
          <p>
            Creators must be at least 18 years of age and provide accurate, verifiable identity documentation. Required verification may
            include government-issued ID, proof of address, and a live selfie to match ID. ID documents are stored securely and are used
            only for compliance and anti-fraud purposes.
          </p>
          <p>
            MeowFans may refuse, suspend, or close Creator accounts that fail verification or are associated with fraud, identity theft, or
            statutory violations.
          </p>
        </section>

        <section id="content-guidelines">
          <h2>2. Content Guidelines & Warranties</h2>
          <p>
            Creators must ensure that all Content is lawful, consensual, and does not infringe third-party rights. By uploading you warrant
            you have the necessary rights, releases, and consents from any person appearing in the Content, including model releases when
            applicable.
          </p>
          <p>
            Creators are responsible for labeling content where required (e.g., mature tags, NSFW flags) and for accurate metadata
            (location, performer names, production dates where required).
          </p>
        </section>

        <section id="2257-creators">
          <h2>3. 18 U.S.C. §2257 Compliance & Records Custodian</h2>
          <p>
            Where applicable, creators must maintain 2257 records proving the age of performers. MeowFans may require proof during
            compliance reviews. Creators must retain records for the period required by law and make them available to authorized persons.
          </p>
        </section>

        <section id="licensing-creators">
          <h2>4. Licensing, Distribution & Promotional Use</h2>
          <p>
            Creators retain ownership of their content but grant MeowFans a license (non-exclusive, worldwide, sublicensable, royalty-free)
            to host, stream, reproduce, and promote the content on the Platform and affiliates. This license is necessary to provide
            services, caching, and cross-device streaming.
          </p>
        </section>

        <section id="payouts-creators">
          <h2>5. Payments, Fees, Payouts & Holds</h2>
          <p>
            Creators receive payments via supported payout methods. The Platform charges fees and commissions as disclosed in account
            settings. Payments are subject to verification and may be placed on hold for chargebacks, disputes, suspected fraud, or legal
            requests.
          </p>
          <p>
            Creators are responsible for any taxes, reporting, or obligations in their jurisdictions. MeowFans may provide end-of-year
            summaries or tax forms where applicable.
          </p>
        </section>

        <section id="dmca">
          <h2>6. Copyright, DMCA & Takedown Procedures</h2>
          <p>
            Creators should not upload copyrighted material without authorization. If a copyright owner notifies MeowFans of infringement,
            we will follow statutory procedures including removal of the contested content. Creators may submit counternotices where legally
            permitted.
          </p>
        </section>

        <section id="prohibited-creators">
          <h2>7. Prohibited Content & Conduct</h2>
          <p>
            The following are strictly prohibited: underage content, non-consensual acts, bestiality, graphic violence, trafficking,
            terrorism content, and any content that violates local criminal law. Violations will lead to immediate removal and possible law
            enforcement notification.
          </p>
        </section>

        <section id="disputes-creators">
          <h2>8. Dispute Resolution, Appeals & Account Reinstatement</h2>
          <p>
            Creators may appeal moderation decisions through the support and appeals process. Appeals require factual documentation.
            Reinstatement may be conditional on compliance training or additional verification.
          </p>
        </section>

        <section id="analytics-creators">
          <h2>9. Creator Analytics & Data</h2>
          <p>
            Creators receive aggregate analytics (views, earnings, demographics) subject to privacy constraints. MeowFans does not disclose
            personally identifiable information of Fans without consent or legal requirement.
          </p>
        </section>

        <section id="insurance">
          <h2>10. Insurance, Liability & Indemnity</h2>
          <p>
            Creators are encouraged to maintain appropriate insurance for their activities. Creators indemnify MeowFans against claims
            arising from their content or breach of these Terms.
          </p>
        </section>

        <section id="termination-creators">
          <h2>11. Termination, Revenue Reconciliation & Final Payouts</h2>
          <p>
            Upon termination, Creators will receive reconciled payouts subject to holds, disputes, and fees. MeowFans will provide
            accounting records in reasonable detail for final reconciliation.
          </p>
        </section>

        <section id="record-keeping">
          <h2>12. Record-Keeping & Cooperation with Authorities</h2>
          <p>
            Creators must retain production records and cooperate with lawful requests from authorities. MeowFans may preserve content and
            records for legal reasons, audits, or investigations.
          </p>
        </section>

        <section id="misc-creators">
          <h2>13. Miscellaneous</h2>
          <p>
            These Creators’ Terms supplement the General Terms. Non-waiver, severability, and assignment provisions in the General Terms
            apply here.
          </p>
        </section>

        <footer>
          <p className="text-sm text-gray-500 mt-8">
            Creator support: <a href="mailto:support@meowfans.com">support@meowfans.com</a> • Last updated: {moment().format('L')}
          </p>
        </footer>
      </article>
    </main>
  );
};

export default CreatorTerms;
