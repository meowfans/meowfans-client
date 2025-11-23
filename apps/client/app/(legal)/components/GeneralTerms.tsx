/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Terms of Use | MeowFans',
  description: 'Comprehensive General Terms of Use for MeowFans — platform rules, user obligations, restrictions, and legal provisions.'
};

export default function GeneralTermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-neutral-900 dark:text-gray-200 px-6 py-12">
      <article className="prose prose-slate dark:prose-invert max-w-5xl mx-auto">
        <h1>MeowFans — General Terms of Use</h1>

        <p className="lead">
          Effective Date: {moment().format('L')}. These General Terms of Use (&quot;Terms&quot;) form a binding agreement between you
          (&quot;you&quot;, &quot;User&quot;) and MeowFans (&quot;MeowFans&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). They
          govern your access to and use of the MeowFans website, mobile applications, APIs, and services (collectively, the
          &quot;Platform&quot;).
        </p>

        <section>
          <h2>1. Acceptance; Scope</h2>
          <p>
            By registering for an account, clicking &quot;I agree&quot;, accessing, or otherwise using the Platform, you accept and agree to
            be bound by these Terms, our Privacy Policy, Creator Terms (if applicable), and any additional terms posted on the Platform. If
            you do not agree to these Terms, you must not access or use the Platform.
          </p>
          <p>
            These Terms apply to all Users (including visitors, Fans, and Creators). Specific sections of these Terms are directed at
            different user roles and will apply where relevant. Where any Additional Terms conflict with these Terms, the Additional Terms
            govern with respect to the applicable subject matter.
          </p>
        </section>

        <section>
          <h2>2. Definitions</h2>
          <p>
            For clarity, the following defined terms are used throughout these Terms: "Content" means any material uploaded, posted or made
            accessible on the Platform, including text, images, audio, video, and streaming media. "Creator" means a user who publishes
            Content to monetize or distribute it through the Platform. "Fan" means a user who consumes Content or transacts with Creators.
          </p>
        </section>

        <section>
          <h2>3. Eligibility; Age</h2>
          <p>
            The Platform is intended for individuals who are at least eighteen (18) years old, or the age of majority in their jurisdiction,
            whichever is greater. By using the Platform you represent and warrant that you meet the age requirement and have the authority
            to enter into these Terms.
          </p>
          <p>
            If you are a legal guardian of a person who has used or attempted to use the Platform in violation of this provision, contact us
            immediately at <a href="mailto:support@meowfans.com">support@meowfans.com</a>.
          </p>
        </section>

        <section>
          <h2>4. Account Registration and Verification</h2>
          <p>
            To access certain features, you must create an account. You agree to provide accurate, current, and complete information and to
            maintain and promptly update your account information. You are responsible for protecting your account credentials and for all
            activity occurring under your account.
          </p>
          <p>
            We may require verification steps, including email confirmation, phone verification, identity verification (government ID and
            selfie), and additional Know-Your-Customer (KYC) checks for Creators or high-value Fans. We reserve the right to refuse,
            suspend, or terminate accounts that fail verification or that we reasonably believe are fraudulent, abusive, or non-compliant.
          </p>
        </section>

        <section>
          <h2>5. User Responsibilities and Acceptable Use</h2>
          <p>You agree not to use the Platform to upload, transmit, distribute, or otherwise make available any Content that:</p>
          <ul>
            <li>Depicts persons under 18 or appears to depict minors;</li>
            <li>Is non-consensual, exploitative, or illegal;</li>
            <li>Infringes a third party's intellectual property rights;</li>
            <li>Contains malware, data harvesting mechanisms, or spam;</li>
            <li>Attempts to circumvent our age-verification, payment, or moderation systems.</li>
          </ul>
          <p>
            You must comply with all applicable laws (including export controls, sanctions, and content-specific regulations). Persistent
            abusive behavior, hate speech, or threats are prohibited and may result in account suspension or permanent ban.
          </p>
        </section>

        <section>
          <h2>6. Content Ownership and License</h2>
          <p>
            Creators retain ownership of Content they upload to the Platform, subject to the licenses they grant to MeowFans and to Fans. By
            uploading Content, you grant MeowFans a non-exclusive, worldwide, royalty-free, transferable license to host, store, stream,
            reproduce, distribute, modify (for technical purposes), and display such Content as necessary to provide the Platform and to
            promote the Platform in our marketing channels.
          </p>
          <p>
            Fans and other users are granted only the limited license to access and view Content consistent with these Terms and any
            specific rights the Creator has provided (e.g., purchase permission or download rights). Unauthorized copying, distribution, or
            commercial exploitation of Content without the Creator's permission is prohibited.
          </p>
        </section>

        <section>
          <h2>7. Payments, Fees, and Payouts</h2>
          <p>
            The Platform supports payments using third-party processors such as Stripe and PayPal. All purchases are subject to the
            processor's terms, applicable fees, and the Platform's policies.
          </p>
          <p>
            We may collect platform fees, processing fees, or commissions on Creator earnings as disclosed in account settings. Payouts to
            Creators are issued in accordance with the payout schedule and subject to identity verification, tax compliance, and holds for
            disputes or chargebacks. We reserve the right to place a temporary hold on payouts in the event of suspected fraud or ongoing
            investigations.
          </p>
          <p>
            Refunds are generally handled consistent with the Payment Processor's policies. Where required by law, we will provide refunds
            or credits. Abuse of refund mechanisms (e.g., fraudulent chargeback attempts) may result in account termination and legal
            action.
          </p>
        </section>

        <section>
          <h2>8. Taxes and Reporting</h2>
          <p>
            Users are responsible for any taxes, duties, or other governmental charges arising from transactions on the Platform. MeowFans
            may collect and report tax-related information to tax authorities where required by applicable law. Creators are responsible for
            providing tax documentation and accurate reporting details.
          </p>
          <p>
            Where required, MeowFans may issue tax documents (such as Form 1099, local equivalents, or summary statements) and will request
            taxpayer identification numbers or other information to meet reporting obligations.
          </p>
        </section>

        <section>
          <h2>9. Moderation, Enforcement, and Takedown</h2>
          <p>
            MeowFans maintains a content moderation program that includes automated detection, human review, and community reporting. We may
            remove, restrict, or demonetize Content that violates these Terms or our policies. We may also suspend or terminate accounts for
            violations without prior notice.
          </p>
          <p>
            Copyright holders may submit a DMCA notice, or equivalent notice in non-U.S. jurisdictions. MeowFans will process such notices
            in accordance with applicable law. Creators and uploaders who receive takedown notices may submit counternotices where
            permitted.
          </p>
        </section>

        <section>
          <h2>10. 18 U.S.C. §2257 and Recordkeeping</h2>
          <p>
            To the extent applicable, MeowFans requires compliance with 18 U.S.C. §2257 and similar recordkeeping laws. Creators must
            provide valid documentation confirming the age of performers and must retain such documentation for inspection by authorized
            representatives where required by law. MeowFans may act as custodian for records or require the Creator to designate a
            custodian.
          </p>
        </section>

        <section>
          <h2>11. Security; Data Protection; Notifications</h2>
          <p>
            MeowFans uses organizational, technical, and administrative measures designed to help protect personal information against
            unauthorized access, alteration, disclosure, or destruction. Despite our efforts, no security system is impenetrable. In the
            event of a data breach affecting user personal data, we will follow incident response procedures, notify affected users and
            authorities as required by applicable law, and take steps to mitigate harm.
          </p>
          <p>
            Users must promptly notify MeowFans at <a href="mailto:privacy@meowfans.com">privacy@meowfans.com</a> if they suspect a security
            compromise of their account.
          </p>
        </section>

        <section>
          <h2>12. Privacy and Cookies</h2>
          <p>
            MeowFans' collection and use of personal data is governed by our Privacy Policy. We use cookies and similar technologies; the
            Cookie Banner enables users to manage non-essential cookie consent. You can disable cookies via your browser settings, but doing
            so may impair functionality.
          </p>
        </section>

        <section>
          <h2>13. Intellectual Property Infringement</h2>
          <p>
            If you believe content on the Platform infringes your intellectual property rights, please contact us at
            <a href="mailto:support@meowfans.com"> support@meowfans.com</a> with a detailed description and supporting documentation. We
            will evaluate claims and take action as required by applicable law, which may include removal of the content and notification to
            the uploader.
          </p>
        </section>

        <section>
          <h2>14. Availability; Service Levels; Backups</h2>
          <p>
            We do not guarantee that the Platform or any portion thereof will be available at all times. We endeavor to maintain service
            availability and perform routine and emergency maintenance, but interruptions may occur. We maintain backups for disaster
            recovery but are not responsible for loss of Content except where caused by our gross negligence or willful misconduct.
          </p>
        </section>

        <section>
          <h2>15. Warranties and Disclaimers</h2>
          <p>
            EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS, THE PLATFORM, SERVICES, CONTENT, AND ANY MATERIALS PROVIDED ARE PROVIDED "AS IS"
            AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, MEOWFANS DISCLAIMS ALL WARRANTIES,
            EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </section>

        <section>
          <h2>16. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL MEOWFANS BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
            EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM. OUR AGGREGATE LIABILITY FOR
            DIRECT DAMAGES WILL NOT EXCEED THE AMOUNTS PAID BY YOU TO MEOWFANS IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO
            LIABILITY, OR ONE HUNDRED DOLLARS (USD 100), WHICHEVER IS GREATER.
          </p>
        </section>

        <section>
          <h2>17. Indemnification</h2>
          <p>
            You agree to indemnify and hold MeowFans, our affiliates, officers, directors, employees, and agents harmless from any claims,
            liabilities, losses, damages, and expenses arising from your breach of these Terms, your Content, or your misuse of the
            Platform.
          </p>
        </section>

        <section>
          <h2>18. Export Controls and Sanctions</h2>
          <p>
            You must comply with all applicable export and sanctions laws and regulations. You agree not to use the Platform in violation of
            U.S. or other applicable export control laws. MeowFans reserves the right to block access to the Platform from countries or
            persons subject to sanctions.
          </p>
        </section>

        <section>
          <h2>19. Audit Rights</h2>
          <p>
            Where required for regulatory compliance, MeowFans or its agents may audit Creator records (including age verification and
            production documentation) subject to reasonable notice and confidentiality protections. You agree to cooperate with reasonable
            audit requests and provide accurate records.
          </p>
        </section>

        <section>
          <h2>20. Suspension, Termination, and Survival</h2>
          <p>
            We may suspend or terminate your access for violations of these Terms, suspected fraud, legal obligations, or other legitimate
            reasons. Sections that by their nature should survive termination (including Indemnification, Limitation of Liability,
            Intellectual Property, and Governing Law) will remain in force following termination.
          </p>
        </section>

        <section>
          <h2>21. Dispute Resolution; Governing Law</h2>
          <p>
            These Terms are governed by the laws of India, without regard to conflict of law provisions. Users agree to submit to the
            exclusive jurisdiction of the courts of India for any dispute arising out of or relating to these Terms, unless otherwise
            required by applicable law. Parties agree to attempt informal resolution before resorting to litigation where practicable.
          </p>
        </section>

        <section>
          <h2>22. Changes to the Terms</h2>
          <p>
            We may modify these Terms at our discretion. If we make material changes, we will provide notice via the Platform, email, or
            other means. Continued use of the Platform following notice of changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2>23. Notices</h2>
          <p>
            Notices to you may be provided via email, postings on the Platform, or other contact information you provide. Notices to
            MeowFans should be sent to <a href="mailto:support@meowfans.com">support@meowfans.com</a> and will be deemed received upon
            delivery where electronic transmission is acknowledged.
          </p>
        </section>

        <section>
          <h2>24. Miscellaneous Provisions</h2>
          <p>
            These Terms comprise the entire agreement between you and MeowFans regarding the Platform. If any provision is found invalid or
            unenforceable, the remaining provisions will remain in full force and effect. No failure or delay in exercising any right will
            operate as a waiver. The headings are for convenience and do not affect interpretation.
          </p>
          <p>
            Assignment: You may not assign or transfer your rights or obligations under these Terms without MeowFans' prior written consent.
            MeowFans may assign or transfer these Terms in connection with a merger, acquisition, or sale of assets.
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
}
