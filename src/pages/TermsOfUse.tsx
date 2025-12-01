import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo_transparent.png";
import BackIcon from "../assets/icons/circle-chevron-left.svg?react";

export default function TermsOfUse() {
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
        <h1 className="text-3xl sm:text-4xl font-bold">Terms of Use</h1>
        <div className="legal-text text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/10 rounded-xl p-6 bg-white/40 dark:bg-white/5">
          {<>
  <p><strong>Last updated: 2025</strong></p>

  <p>
    Welcome to <strong>Secure Call</strong>, a privacy-first voice communication platform. By creating
    an account or using the application, you agree to the following Terms of Use.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">1. Purpose of the Service</h2>
  <p>
    Secure Call is designed to provide private, end-to-end encrypted voice communication. The
    application uses device-generated encryption keys and does not store your private keys on any
    external server.
  </p>
  <p>
    Secure Call is not intended for emergency communication or high-availability systems.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
  <p>You agree to:</p>
  <ul className="list-disc ml-6 space-y-1">
    <li>provide accurate account information;</li>
    <li>keep your device secure;</li>
    <li>not share your account or device keys with others;</li>
    <li>not try to intercept, decrypt, or manipulate traffic;</li>
    <li>not use Secure Call for illegal activities or harassment.</li>
  </ul>
  <p>
    You are solely responsible for all actions performed through your account.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">3. End-to-End Encryption</h2>
  <p>
    Secure Call uses end-to-end encryption for all calls. Keys are generated and stored locally on
    your device. The service cannot access, restore, or decrypt your communications.
  </p>
  <p>
    If you lose your device or uninstall the application, your encryption keys may be
    irretrievably lost.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">4. Account and Device Sessions</h2>
  <p>
    You may be signed in on multiple devices. Each device has its own identity key. You may review
    or terminate active sessions from the <strong>Devices</strong> section in Settings.
  </p>
  <p>Secure Call may automatically end old or inactive sessions for security purposes.</p>

  <h2 className="text-xl font-semibold mt-6 mb-2">5. Service Availability</h2>
  <p>
    The service is provided “as is”, without guarantees of uptime, stability, or uninterrupted
    operation. Maintenance or updates may temporarily limit access to features.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">6. Prohibited Use</h2>
  <p>You may not use Secure Call to:</p>
  <ul className="list-disc ml-6 space-y-1">
    <li>defraud others;</li>
    <li>distribute malware or spyware;</li>
    <li>attempt unauthorized access to servers or accounts;</li>
    <li>impersonate another person;</li>
    <li>interfere with the operation of the service.</li>
  </ul>
  <p>
    Violation may lead to account suspension or termination.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">7. Account Deletion</h2>
  <p>
    You may permanently delete your account at any time. This action is <strong>irreversible</strong> and removes:
  </p>
  <ul className="list-disc ml-6 space-y-1">
    <li>your profile information,</li>
    <li>your device sessions,</li>
    <li>your encrypted calling history (stored only on your device).</li>
  </ul>
  <p>Encryption keys remain on your device until you uninstall the application.</p>

  <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to These Terms</h2>
  <p>
    Secure Call may update these Terms over time. Continued use of the service after changes means
    you accept the updated Terms.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
  <p>
    For questions regarding these Terms, contact the Secure Call team.
  </p>
</>
}
        </div>
      </main>
    </div>
  );
}
