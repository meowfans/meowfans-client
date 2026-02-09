'use client';

import { FileText } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function GeneralTermsPage() {
  return (
    <LegalPageView title="General Terms" lastUpdated="February 2026" icon={FileText}>
      <p className="lead">These general terms apply to all visitors and users of the MeowFans network.</p>

      <h2>1. Intellectual Property</h2>
      <p>
        The MeowFans logo, website design, and proprietary technology are the intellectual property of MeowFans and may not be used without
        permission.
      </p>

      <h2>2. Third-Party Links</h2>
      <p>
        Our platform may contain links to third-party websites. We are not responsible for the content or privacy practices of these
        external sites.
      </p>

      <h2>3. Modifications</h2>
      <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform.</p>

      <h2>4. Governing Law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which MeowFans is headquartered, without regard to its conflict of law
        provisions.
      </p>
    </LegalPageView>
  );
}
