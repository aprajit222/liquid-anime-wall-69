
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-purple-200/80 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
            <div className="text-purple-200/90 space-y-3">
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create an account or use our services</li>
                <li>Download wallpapers or interact with content</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
            <div className="text-purple-200/90 space-y-3">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience and content recommendations</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Information Sharing</h2>
            <p className="text-purple-200/90">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Data Security</h2>
            <p className="text-purple-200/90">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <p className="text-purple-200/90">
              If you have any questions about this Privacy Policy, please contact us at privacy@hqaniwall.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
