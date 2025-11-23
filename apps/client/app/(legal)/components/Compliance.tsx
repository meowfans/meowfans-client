import moment from 'moment';

const Compliance = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">18 U.S.C. § 2257 Compliance Statement</h1>

      <p className="mb-4">
        In compliance with <strong>Title 18 U.S.C. §2257</strong> and
        <strong> 28 C.F.R. Part 75</strong>, this statement serves as our official record-keeping and compliance notice for visual
        depictions that may appear on
        <strong> MeowFans</strong> (“the Website”).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Legal Age of Performers</h2>
      <p className="mb-4">
        All persons appearing in any visual content displayed on this Website were at least <strong>18 years of age or older</strong> at the
        time of production. Appropriate proof of age documentation, including government-issued photo identification, has been obtained and
        is maintained in accordance with federal law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Content Producers</h2>
      <p className="mb-4">
        The operators of this Website are not the primary producers of most visual content appearing here unless explicitly stated
        otherwise. In cases where
        <strong> MeowFans</strong> directly produces or commissions visual material, full compliance with 18 U.S.C. §2257 record-keeping
        requirements is observed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Records Custodian Information</h2>
      <p className="mb-4">
        The records required pursuant to 18 U.S.C. §2257 and 28 C.F.R. Part 75 for materials directly produced by <strong> MeowFans</strong>{' '}
        are kept by the designated Records Custodian at the following address:
      </p>

      <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-md mb-4">
        <p className="font-semibold text-white">Records Custodian:</p>
        <p>MeowFans</p>
        <p>support@meowfans.com</p>
      </div>

      <p className="mb-4">
        Records are available for inspection by authorized government representatives during normal business hours, as required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Exempt Materials</h2>
      <p className="mb-4">
        Some visual content appearing on this Website may be exempt from the record-keeping requirements of 18 U.S.C. §2257 and 28 C.F.R.
        Part 75 because it does not depict actual sexually explicit conduct, as defined by federal law, or because the visual depictions are
        otherwise not subject to such requirements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Content</h2>
      <p className="mb-4">
        For content provided by third parties, affiliates, or contributors,
        <strong> MeowFans</strong> relies upon the representations and warranties of those content providers that all individuals depicted
        are of legal age and that proper record-keeping is maintained.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Information</h2>
      <p className="mb-4">
        For inquiries regarding this Compliance Statement or the associated records, please contact our compliance department at:
      </p>
      <p>
        <a href="mailto:compliance@meowfans.com" className="text-blue-400 underline">
          compliance@meowfans.com
        </a>
      </p>

      <p className="text-gray-400 mt-8 text-sm">Last Updated: {moment().format('L')}</p>
    </main>
  );
};

export default Compliance;
