/* eslint-disable react/no-unescaped-entities */

import moment from 'moment';

const Privacy = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-neutral-900 dark:text-gray-200 px-6 py-12">
      <article className="prose prose-slate dark:prose-invert max-w-5xl mx-auto">
        <h1 id="privacy-policy">MeowFans — Privacy Policy</h1>
        <p className="lead">
          Effective Date: {moment().format('L')}. This Privacy Policy explains how MeowFans ("we", "us", or "our") collects, uses,
          discloses, and protects personal information worldwide.
        </p>

        <section id="overview">
          <h2>1. Overview</h2>
          <p>
            MeowFans operates from India and serves users globally. We collect information necessary to operate the Platform, ensure legal
            compliance (including age verification), process payments, and deliver features. We are committed to privacy-by-design and data
            minimization.
          </p>
        </section>

        <section id="categories">
          <h2>2. Categories of Personal Information We Collect</h2>
          <p>We collect several types of information, including but not limited to:</p>
          <ul>
            <li>Account identifiers: email, display name, username;</li>
            <li>Verification documents: government IDs, selfies (for Creators); stored securely;</li>
            <li>Payment metadata: transaction IDs, last four digits (tokenized via Stripe/PayPal);</li>
            <li>Usage data: IP address, device and browser type, pages viewed, session timestamps;</li>
            <li>Content and associated metadata that you upload;</li>
            <li>Cookies and tracking identifiers.</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2>3. How We Use Personal Information</h2>
          <p>We use collected information for:</p>
          <ul>
            <li>Providing and improving the Platform;</li>
            <li>Age and identity verification and compliance with laws (e.g., 2257);</li>
            <li>Processing payments and preventing fraud;</li>
            <li>Customer support and billing communications;</li>
            <li>Security, abuse prevention, and law enforcement requests;</li>
            <li>Personalization and recommendations (where consented).</li>
          </ul>
        </section>

        <section id="legal-bases">
          <h2>4. Legal Bases for Processing (GDPR)</h2>
          <p>
            Where GDPR applies, we process personal data on various legal bases including consent, contract necessity, legal obligation, and
            legitimate interests such as fraud prevention and platform security. For data processed on legitimate interests, we balance
            rights and implement safeguards.
          </p>
        </section>

        <section id="cookies">
          <h2>5. Cookies, Tracking & Analytics</h2>
          <p>
            We use cookies and similar technologies. Essential cookies are required for site functionality. Non-essential cookies
            (analytics, advertising) require user consent via the Cookie Banner. We recommend privacy-first analytics providers and
            anonymize IP addresses where feasible.
          </p>
        </section>

        <section id="third-parties">
          <h2>6. Third-Party Services & Data Sharing</h2>
          <p>
            We share data with service providers who perform processing on our behalf (payment processors, hosting providers, moderation
            vendors). We contractually require vendors to implement appropriate security measures. We may share data to comply with legal
            processes or protect vital interests.
          </p>
        </section>

        <section id="transfers">
          <h2>7. International Transfers & Safeguards</h2>
          <p>
            Personal data may be transferred outside your jurisdiction. Where transfers occur, we implement safeguards such as standard
            contractual clauses or rely on adequacy findings where available.
          </p>
        </section>

        <section id="data-retention">
          <h2>8. Data Retention & Deletion</h2>
          <p>
            We retain personal data as long as necessary for the purposes described (account maintenance, legal compliance, dispute
            resolution). Specific retention schedules apply for verification records (2257) and financial records as required by law. Users
            may request deletion subject to legal exceptions.
          </p>
        </section>

        <section id="rights">
          <h2>9. Your Rights (Access, Portability, Erasure)</h2>
          <p>
            Depending on jurisdiction, you may have rights to access, correct, delete, restrict processing, or obtain copies of your data.
            To exercise rights, contact
            <a href="mailto:privacy@meowfans.com"> privacy@meowfans.com</a>. We may require identity verification before fulfilling
            requests.
          </p>
        </section>

        <section id="security-measures">
          <h2>10. Security Measures & Incident Handling</h2>
          <p>
            We implement reasonable security controls (encryption at rest/in transit, access controls, logging). In case of a data breach,
            we follow an incident response plan including notification to affected users and regulators as required by law.
          </p>
        </section>

        <section id="children">
          <h2>11. Children & Minors</h2>
          <p>
            The Platform is not directed to children. We do not knowingly collect data from individuals under 18. If we learn that a minor
            has provided personal data, we will take steps to remove such information and terminate the account.
          </p>
        </section>

        <section id="vendor-management">
          <h2>12. Vendor Management & Data Processing Agreements</h2>
          <p>
            We perform due diligence and execute processing agreements with vendors handling personal data. Vendors are restricted to
            process data only on our instructions.
          </p>
        </section>

        <section id="cookies-consent">
          <h2>13. Cookie Consent & Preference Management</h2>
          <p>
            The Cookie Banner provides consent management. Users may change cookie preferences at any time via account settings or browser
            controls. Refusal of certain cookies may degrade the user experience.
          </p>
        </section>

        <section id="ccpa">
          <h2>14. California Residents (CCPA/CPRA)</h2>
          <p>
            For California residents, the policy describes categories of personal information collected and how to opt-out of sales
            (MeowFans does not sell personal data as commonly understood, but may share data with processors). Submit California privacy
            requests via <a href="mailto:privacy@meowfans.com">privacy@meowfans.com</a>.
          </p>
        </section>

        <section id="gdpr-dpia">
          <h2>15. GDPR, Data Protection Impact Assessments & Data Protection Officer</h2>
          <p>
            Where required, MeowFans conducts DPIAs for high-risk processing. Contact the privacy team at{' '}
            <a href="mailto:privacy@meowfans.com">privacy@meowfans.com</a> for inquiries.
          </p>
        </section>

        <section id="law-enforcement">
          <h2>16. Law Enforcement Requests</h2>
          <p>
            We respond to lawful requests from governments and law enforcement. Where allowed, we will notify affected users prior to
            disclosure unless prohibited by law. We require proper legal process before producing non-public user data.
          </p>
        </section>

        <section id="changes-privacy">
          <h2>17. Changes to this Policy</h2>
          <p>
            We may update this policy. Material changes will be notified via the Platform or email. Continued use after notice indicates
            acceptance.
          </p>
        </section>

        <section id="contact-privacy">
          <h2>18. Contact & Complaints</h2>
          <p>
            Privacy contact: <a href="mailto:privacy@meowfans.com">privacy@meowfans.com</a>. For escalations, include account details and
            your preferred contact method.
          </p>
        </section>

        <footer>
          <p className="text-sm text-gray-500 mt-8">
            Contact: <a href="mailto:privacy@meowfans.com">privacy@meowfans.com</a> • Last updated: {moment().format('L')}
          </p>
        </footer>
      </article>
    </main>
  );
};

export default Privacy;
