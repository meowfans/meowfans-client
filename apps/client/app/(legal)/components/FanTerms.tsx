import moment from 'moment';

const FanTerms = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-neutral-900 dark:text-gray-200 px-6 py-12">
      <article className="prose prose-slate dark:prose-invert max-w-5xl mx-auto">
        <h1 id="fans-terms">MeowFans — Fans’ Terms of Use</h1>
        <p className="lead">
          Effective Date: {moment().format('L')}. These Fans’ Terms supplement the General Terms and specifically govern the relationship
          between MeowFans and users who consume content (Fans), make purchases, or subscribe to Creators.
        </p>

        <section id="fan-account">
          <h2>1. Account Creation & Security</h2>
          <p>
            Fans may register using email or supported social providers. You agree to maintain accurate contact information and keep your
            credentials secure. Account sharing is prohibited unless expressly permitted by the Platform.
          </p>
          <p>
            If you believe your account has been compromised, immediately change your password and contact support at{' '}
            <a href="mailto:support@meowfans.com">support@meowfans.com</a>.
          </p>
        </section>

        <section id="purchases">
          <h2>2. Purchases, Subscriptions & Access Rules</h2>
          <p>
            When you purchase content or subscribe to a Creator, you receive a license to access that content per the terms displayed at
            purchase. Subscriptions are recurring and will automatically renew unless canceled. Cancellation does not typically result in
            pro-rated refunds for the current billing cycle.
          </p>
          <p>
            For subscription cancellations, follow the account management flow. Refund policies are described in the Billing Help and are
            subject to processor policies (Stripe/PayPal).
          </p>
        </section>

        <section id="billing">
          <h2>3. Billing, Chargebacks & Fraud Prevention</h2>
          <p>
            All payments are processed by third-party processors; we may maintain records of transaction identifiers and non-sensitive
            metadata. Chargebacks that are determined to be fraudulent may result in account suspension and recovery efforts. Excessive
            disputes can lead to termination.
          </p>
          <p>
            You must not use stolen payment methods. MeowFans uses fraud-detection tools and may temporarily block transactions pending
            investigation.
          </p>
        </section>

        <section id="behavior">
          <h2>4. Community Behavior, Harassment & Reporting</h2>
          <p>
            Treat Creators and other Fans with respect. Do not harass, stalk, threaten, or coerce creators. Use platform reporting tools to
            flag abusive or illegal behavior. MeowFans will investigate and take appropriate action, including content removal and account
            suspension.
          </p>
        </section>

        <section id="privacy-fans">
          <h2>5. Privacy, Anonymity & Shared Data</h2>
          <p>
            Your privacy choices control what profile data is visible. MeowFans may share certain minimal information with Creators (e.g.,
            display name) when necessary for content access, tips, or private messages. If you enable gifting or direct messages, you may be
            sharing limited profile info with the recipient.
          </p>
        </section>

        <section id="tips-dms">
          <h2>6. Tips, Private Content & Direct Messaging</h2>
          <p>
            Purchasing private content or sending tips grants access per the Creator’s terms. Private messages are subject to platform rules
            and monitoring for safety (automated moderation for illegal content). Creators are expected to respond in good faith but are not
            guaranteed to fulfill private service requests unless a contract or explicit agreement exists.
          </p>
        </section>

        <section id="refunds-fans">
          <h2>7. Refunds, Technical Failures & Credits</h2>
          <p>
            Refunds are granted when required by law or at our discretion for technical failures. Where refunds are issued, MeowFans may
            deduct fees charged by the payment processor. Promotional credits, vouchers, or site credits are subject to expiration and terms
            specified at issuance.
          </p>
        </section>

        <section id="legal-obligations">
          <h2>8. Legal Obligations & Lawful Use</h2>
          <p>
            Fans must not request or coerce creators into illegal acts. Fans must obey applicable laws governing content access and
            transmission in their jurisdictions. If requested by lawful authority, MeowFans may produce Fan records in accordance with legal
            process.
          </p>
        </section>

        <section id="intellectual-property-fans">
          <h2>9. Intellectual Property and Respect for Creators</h2>
          <p>
            Fans must not reproduce, redistribute, or publish creator content outside the Platform without explicit license. Unauthorized
            rebroadcasting, public posting, or sale of creator content is prohibited and may lead to legal action.
          </p>
        </section>

        <section id="safeguards">
          <h2>10. Safety Tools & Blocking</h2>
          <p>
            MeowFans provides blocking and reporting tools. Use them to prevent harassing users from contacting you. Report suspected
            criminal activity to law enforcement promptly.
          </p>
        </section>

        <section id="support">
          <h2>11. Support, Disputes & Account Sanctions</h2>
          <p>
            For billing or conduct disputes, contact support at <a href="mailto:support@meowfans.com">support@meowfans.com</a>. We may
            temporarily restrict accounts while investigating. Appeals processes for sanctions are described in Help Center articles and may
            require identity verification.
          </p>
        </section>

        <section id="misc-fans">
          <h2>12. Miscellaneous Provisions for Fans</h2>
          <p>
            These Fans’ Terms supplement the General Terms. In case of conflict, the Fans’ Terms control for matters specific to Fans.
            MeowFans reserves the right to update these terms with notice.
          </p>
        </section>

        <footer>
          <p className="text-sm text-gray-500 mt-8">
            Contact: <a href="mailto:support@meowfans.com">support@meowfans.com</a> • Last updated: {moment().format('L')}
          </p>
        </footer>
      </article>
    </main>
  );
};

export default FanTerms;
