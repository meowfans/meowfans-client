'use client';

import { Scale } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function Compliance2257Page() {
  return (
    <LegalPageView title="2257 Compliance" lastUpdated="February 2026" icon={Scale}>
      <p className="lead">MeowFans is in full compliance with the record-keeping requirements of 18 U.S.C. § 2257 and 2257A.</p>

      <h2>Custodian of Records</h2>
      <p>
        MeowFans maintains all required records for content produced by or through the platform. The Custodian of Records is located at:
      </p>
      <address className="not-italic bg-secondary/20 p-6 rounded-2xl border border-white/5 my-8">
        MeowFans Compliance Department
        <br />
        123 Digital Drive, Suite 100
        <br />
        Tech City, TC 99999
      </address>

      <h2>Verification of Age</h2>
      <p>
        All creators on the MeowFans platform are required to provide valid government-issued identification to verify they are at least 18
        years of age prior to producing or appearing in any content.
      </p>

      <h2>Content Standards</h2>
      <p>
        All depictions of sexual conduct as defined in 18 U.S.C. § 2256 are subject to strict record-keeping and age verification protocols.
      </p>
    </LegalPageView>
  );
}
