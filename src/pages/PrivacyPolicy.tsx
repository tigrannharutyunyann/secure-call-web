import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo_transparent.png";
import BackIcon from "../assets/icons/circle-chevron-left.svg?react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#0d0d0d] dark:to-[#131313] text-slate-900 dark:text-white">
      <div className="w-full bg-accent/10 dark:bg-accent/20 border-b border-accent/30 dark:border-accent/40 shadow-sm backdrop-blur">
        <header className="max-w-6xl mx-auto px-5 sm:px-7 py-5 flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition"
          >
            <BackIcon className="w-6 h-6" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Secure Call" className="w-10 h-10 object-contain" />
            <div className="text-left">
              <p className="text-lg font-semibold leading-tight">Secure Call</p>
              <p className="text-xs text-muted -mt-0.5">Private by design</p>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20 lg:py-24 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <div className="legal-text text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/10 rounded-xl p-6 bg-white/40 dark:bg-white/5">
          {<>
  <p><strong>Last updated: 2025</strong></p>

  <p>
    This Privacy Policy explains what information <strong>Secure Call</strong> collects, how it is
    used, and how your privacy is protected.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">1. Core Principle</h2>
  <p>
    Secure Call is built on the principle: <strong>"Your conversations belong only to you."</strong>
    We minimize data storage and ensure encryption keys remain on your devices.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Do Not Collect</h2>
  <p>Secure Call does <strong>not</strong> collect:</p>
  <ul className="list-disc ml-6 space-y-1">
    <li>call content;</li>
    <li>audio data;</li>
    <li>encryption keys;</li>
    <li>call metadata (participants, timestamps, duration);</li>
    <li>your contacts or phone numbers;</li>
    <li>device fingerprints.</li>
  </ul>
  <p>We do not store or have access to your voice conversations.</p>

  <h2 className="text-xl font-semibold mt-6 mb-2">3. Information We Collect</h2>
  <p>To operate the service, we may collect:</p>
  <ul className="list-disc ml-6 space-y-1">
    <li>your account email;</li>
    <li>your display name;</li>
    <li>your active device sessions;</li>
    <li>basic error logs for stability and diagnostics.</li>
  </ul>
  <p>
    This information is never sold or shared with third parties unless legally required.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">4. Device Keys and Encryption</h2>
  <p>
    Your encryption keys are generated locally on your device. They never leave your device and are
    never transmitted to servers. Secure Call cannot access, restore, or reset your private keys.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies and Local Storage</h2>
  <p>
    We may store minimal data locally, such as:
  </p>
  <ul className="list-disc ml-6 space-y-1">
    <li>session authentication tokens;</li>
    <li>theme preferences;</li>
    <li>language settings;</li>
    <li>device session information.</li>
  </ul>
  <p>
    No advertising or tracking cookies are used.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">6. Account Deletion</h2>
  <p>
    When you delete your account, we remove:
  </p>
  <ul className="list-disc ml-6 space-y-1">
    <li>your profile information;</li>
    <li>your active device sessions;</li>
    <li>any non-encrypted account data.</li>
  </ul>
  <p>
    Since call content and encryption keys are stored only on your device, there is no call or key
    data stored on our servers to delete.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">7. Security Practices</h2>
  <p>Secure Call implements modern protections, including:</p>
  <ul className="list-disc ml-6 space-y-1">
    <li>end-to-end encryption for all calls;</li>
    <li>device-scoped identity keys;</li>
    <li>session transparency indicators;</li>
    <li>warnings on key changes;</li>
    <li>secure HTTPS transport for all requests.</li>
  </ul>
  <p>
    Despite these protections, you are responsible for keeping your device secure.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
  <p>
    We may update this Privacy Policy as the service evolves. Significant changes will be announced
    inside the application.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
  <p>
    For questions about this Privacy Policy, contact the Secure Call team.
  </p>
</>
}
        </div>
      </main>
    </div>
  );
}
