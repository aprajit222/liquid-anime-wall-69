
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-2.5 hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Terms of Service</h1>
        </div>

        {/* Content */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-purple-200/80 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Acceptance of Terms</h2>
            <p className="text-purple-200/90">
              By accessing and using HQ Anime Wall, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Use License</h2>
            <div className="text-purple-200/90 space-y-3">
              <p>Permission is granted to temporarily download wallpapers for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Disclaimer</h2>
            <p className="text-purple-200/90">
              The materials on HQ Anime Wall are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties or conditions of merchantability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Limitations</h2>
            <p className="text-purple-200/90">
              In no event shall HQ Anime Wall or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Accuracy of Materials</h2>
            <p className="text-purple-200/90">
              The materials appearing on HQ Anime Wall could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Contact Information</h2>
            <p className="text-purple-200/90">
              If you have any questions about these Terms of Service, please contact us at legal@hqaniwall.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
