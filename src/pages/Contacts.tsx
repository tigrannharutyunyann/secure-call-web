import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/layout/AppLayout";
import { contacts } from "../mock/contacts";
import ShieldCheckIcon from "../assets/icons/shield-check.svg?react";
import KeyIcon from "../assets/icons/key-round.svg?react";
import EyeIcon from "../assets/icons/eye.svg?react";
import PhoneLockIcon from "../assets/icons/handshake.svg?react";
import MicIcon from "../assets/icons/mic.svg?react";
import VolumeIcon from "../assets/icons/volume-2.svg?react";
import ChevronDown from "../assets/icons/chevron-down.svg?react";
import Modal from "../components/Modal";
import Logo from "../assets/logo/logo_transparent.png";

const securityBadges = [
  { labelKey: "contacts.badges.e2e", icon: ShieldCheckIcon },
  { labelKey: "contacts.badges.device", icon: KeyIcon },
  { labelKey: "contacts.badges.transparency", icon: EyeIcon },
];

export default function Contacts() {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const selected = contacts.find((c) => c.id === id);

  return (
    <AppLayout>
      <div className="flex-1 min-h-screen bg-gray-50/60 dark:bg-[#0b0b0b]">
        {!selected ? <EmptyState /> : <ContactPanel contactId={selected.id} t={t} />}
      </div>
    </AppLayout>
  );
}

function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="h-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full panel bg-[#0f1f2b] text-white border border-accent/20 shadow-2xl rounded-2xl p-8 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center">
          <img src={Logo} alt="Secure Call" className="w-12 h-12 object-contain" />
        </div>
        <h2 className="text-2xl font-bold">{t("contacts.empty.title")}</h2>
        <p className="text-white/80 text-sm leading-relaxed">{t("contacts.empty.subtitle")}</p>
      </div>
    </div>
  );
}

type ContactPanelProps = { contactId: string; t: ReturnType<typeof useTranslation>["t"] };

function ContactPanel({ contactId, t }: ContactPanelProps) {
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return <EmptyState />;
  }

  const fingerprint = "3F:7A:9C:BA:E1:44:52:0C:9D:3A:DE:11:89:AF:2B:73";
  const [badgeModal, setBadgeModal] = useState<null | "e2e" | "device" | "transparency">(null);
  const [verifyModal, setVerifyModal] = useState(false);
  const mockCalls = useMemo(
    () => [
      {
        id: "1",
        title: t("contacts.calls.outgoing"),
        time: t("contacts.calls.todayTime", { time: "09:42" }),
        type: "Outgoing",
        duration: "07:12",
        encryption: "SRTP + AES-256",
        keyChanged: "No",
        fingerprint: "3F:7A:9C:BA:...",
      },
      {
        id: "2",
        title: t("contacts.calls.incoming"),
        time: t("contacts.calls.yesterdayTime", { time: "18:10" }),
        type: "Incoming",
        duration: "04:33",
        encryption: "SRTP + AES-256",
        keyChanged: "No",
        fingerprint: "3F:7A:9C:BA:...",
      },
      {
        id: "3",
        title: t("contacts.calls.missed"),
        time: t("contacts.calls.weekdayTime", { weekday: "Mon", time: "11:25" }),
        type: "Missed",
        duration: "—",
        encryption: "SRTP + AES-256",
        keyChanged: "No",
        fingerprint: "3F:7A:9C:BA:...",
      },
    ],
    [t]
  );
  const [callDetails, setCallDetails] = useState<typeof mockCalls[0] | null>(null);
  const [securityModal, setSecurityModal] = useState(false);
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([]);
  const [micDevice, setMicDevice] = useState<string>("");
  const [speakerDevice, setSpeakerDevice] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let mounted = true;
    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices();
        if (!mounted || !devices) return;
        setAudioInputs(devices.filter((d) => d.kind === "audioinput"));
        setAudioOutputs(devices.filter((d) => d.kind === "audiooutput"));
      } catch {
        if (mounted) {
          setAudioInputs([]);
          setAudioOutputs([]);
        }
      }
    };
    loadDevices();
    return () => {
      mounted = false;
    };
  }, []);

  const micOptions = useMemo(() => audioInputs, [audioInputs]);
  const speakerOptions = useMemo(() => audioOutputs, [audioOutputs]);

  useEffect(() => {
    if (!micDevice && micOptions.length > 0) setMicDevice(micOptions[0].deviceId || "");
  }, [micOptions, micDevice]);

  useEffect(() => {
    if (!speakerDevice && speakerOptions.length > 0) setSpeakerDevice(speakerOptions[0].deviceId || "");
  }, [speakerOptions, speakerDevice]);

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-6">
      <div className="panel p-6 sm:p-8 space-y-6 bg-white dark:bg-[#0f1f2b] text-slate-900 dark:text-white border border-black/5 dark:border-accent/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-black/10 dark:border-accent/30 object-cover"
            />
            <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#0f1f2b]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-semibold">{contact.name}</h2>
            <p className="text-muted text-sm sm:text-base">{contact.status}</p>
            <p className="text-sm text-slate-600 dark:text-white/70">Key pinned • Secure</p>
          </div>
          <div className="sm:ml-auto flex gap-3">
            <Link
              to={`/call/${contact.id}`}
              title="Start an encrypted call"
              className="btn-primary"
            >
              {t("contacts.actions.startCall")}
            </Link>
            <button
              type="button"
              onClick={() => setSecurityModal(true)}
              className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/20 text-slate-900 dark:text-white hover:border-accent/50 hover:bg-accent/10 transition"
            >
              {t("contacts.actions.viewSecurity")}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {securityBadges.map(({ labelKey, icon: Icon }) => (
            <button
              key={labelKey}
              type="button"
              onClick={() =>
                setBadgeModal(
                  labelKey === "contacts.badges.e2e"
                    ? "e2e"
                    : labelKey === "contacts.badges.device"
                    ? "device"
                    : "transparency"
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white text-sm hover:border-accent/40 hover:bg-accent/10 transition"
            >
              <Icon className="w-4 h-4" />
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <PhoneLockIcon className="w-5 h-5 text-accent" />
                <p className="font-semibold">{t("contacts.session.details")}</p>
            </div>
              <p className="text-slate-700 dark:text-white/80 text-sm leading-relaxed">
                {t("contacts.session.desc")}
              </p>
              <p className="text-slate-600 dark:text-white/70 text-xs">
                {t("contacts.session.fingerprint", { fingerprint })}
              </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <PhoneLockIcon className="w-5 h-5 text-accent" />
                <p className="font-semibold">{t("contacts.session.keyFingerprints")}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between bg-black/5 dark:bg-black/10 rounded-lg px-3 py-2">
                  <span className="text-slate-700 dark:text-white/80">{t("contacts.session.myFingerprint")}</span>
                  <span className="font-mono text-slate-900 dark:text-white/90">AA:BB:CC:DD:…</span>
              </div>
              <div className="flex items-center justify-between bg-black/5 dark:bg-black/10 rounded-lg px-3 py-2">
                  <span className="text-slate-700 dark:text-white/80">{t("contacts.session.contactFingerprint")}</span>
                  <span className="font-mono text-slate-900 dark:text-white/90">FF:EE:DD:CC:…</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVerifyModal(true)}
              className="w-full mt-2 px-4 py-3 rounded-lg border border-accent/30 bg-accent/10 text-slate-900 dark:text-white hover:bg-accent/20 transition text-sm"
            >
                {t("contacts.actions.verifyKeys")}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MicIcon className="w-5 h-5 text-accent" />
              <p className="font-semibold">{t("contacts.audio.title")}</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-slate-700 dark:text-white/80">{t("contacts.audio.microphone")}</p>
                <div className="relative">
                  <div
                    onClick={() => setIsMicOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white dark:bg-black/10 border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-black/20 transition"
                  >
                    <span className="text-sm">
                      {micOptions.find((d) => d.deviceId === micDevice)?.label ||
                        micOptions[0]?.label ||
                        t("contacts.audio.microphone")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                        isMicOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isMicOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#0f1f2b]/95 backdrop-blur-sm shadow-xl">
                      {micOptions.length === 0 && (
                        <div className="px-4 py-2 text-sm text-slate-700 dark:text-white/70">{t("contacts.audio.noInputs")}</div>
                      )}
                      {micOptions.map((dev) => (
                        <button
                          key={dev.deviceId || dev.label}
                          type="button"
                          onClick={() => {
                            setMicDevice(dev.deviceId);
                            setIsMicOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                          {dev.label || t("contacts.audio.microphone")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-700 dark:text-white/80">{t("contacts.audio.speaker")}</p>
                <div className="relative">
                  <div
                    onClick={() => setIsSpeakerOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white dark:bg-black/10 border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-black/20 transition"
                  >
                    <span className="text-sm">
                      {speakerOptions.find((d) => d.deviceId === speakerDevice)?.label ||
                        speakerOptions[0]?.label ||
                        t("contacts.audio.speaker")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                        isSpeakerOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isSpeakerOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#0f1f2b]/95 backdrop-blur-sm shadow-xl">
                      {speakerOptions.length === 0 && (
                        <div className="px-4 py-2 text-sm text-slate-700 dark:text-white/70">{t("contacts.audio.noOutputs")}</div>
                      )}
                      {speakerOptions.map((dev) => (
                        <button
                          key={dev.deviceId || dev.label}
                          type="button"
                          onClick={() => {
                            setSpeakerDevice(dev.deviceId);
                            setIsSpeakerOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                          {dev.label || t("contacts.audio.speaker")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.src =
                      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
                    audioRef.current.play().catch(() => {});
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-accent/30 bg-accent/10 text-slate-900 dark:text-white hover:bg-accent/20 transition text-sm"
              >
                <VolumeIcon className="w-4 h-4 text-accent" />
                {t("contacts.audio.test")}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t("contacts.lastCalls.title")}</p>
              <Link to={`/call/${contact.id}`} className="text-accent text-sm hover:underline">
                {t("contacts.lastCalls.view")}
              </Link>
            </div>
            <div className="space-y-2">
              {mockCalls.map((call) => (
                <button
                  key={call.id}
                  type="button"
                  onClick={() => setCallDetails(call)}
                  className="w-full flex items-center justify-between rounded-lg border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 px-3 py-2 hover:border-accent/40 hover:bg-accent/10 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-slate-900 dark:text-white text-sm">{call.title}</p>
                  </div>
                  <p className="text-slate-600 dark:text-white/60 text-xs">{call.time}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} className="hidden" />

      {badgeModal && (
        <Modal
          isOpen
          onClose={() => setBadgeModal(null)}
          title={
            badgeModal === "e2e"
              ? "E2E secured"
              : badgeModal === "device"
              ? "Device-locked keys"
              : "Session transparency"
          }
          secondaryAction={{
            label: "OK",
            onClick: () => setBadgeModal(null),
            variant: "secondary",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            {badgeModal === "e2e" && <ShieldCheckIcon className="w-6 h-6 text-accent" />}
            {badgeModal === "device" && <KeyIcon className="w-6 h-6 text-accent" />}
            {badgeModal === "transparency" && <EyeIcon className="w-6 h-6 text-accent" />}
            <p className="font-semibold">
              {badgeModal === "e2e"
                ? "End-to-end secured"
                : badgeModal === "device"
                ? "Device-locked keys"
                : "Session transparency"}
            </p>
          </div>
          <p className="text-sm text-muted">
            {badgeModal === "e2e" &&
              "Your call will be protected using SRTP + AES-256 end-to-end encryption. Keys never leave your device and are never stored on servers."}
            {badgeModal === "device" &&
              "Each device generates and stores its own private key. If the contact’s key changes, you will be notified before a call."}
            {badgeModal === "transparency" &&
              "You will see the contact’s key fingerprint before the call starts. If the key changes, a warning will appear immediately."}
          </p>
        </Modal>
      )}

      {verifyModal && (
        <Modal
          isOpen
          onClose={() => setVerifyModal(false)}
          title="Verify keys"
          secondaryAction={{
            label: "OK",
            onClick: () => setVerifyModal(false),
            variant: "secondary",
          }}
        >
          <p className="text-sm text-muted">
            Compare key fingerprints with your contact over a trusted channel. Matching fingerprints guarantee that your
            connection cannot be intercepted.
          </p>
        </Modal>
      )}

      {callDetails && (
        <Modal
          isOpen
          onClose={() => setCallDetails(null)}
          title="Call details"
          secondaryAction={{
            label: "OK",
            onClick: () => setCallDetails(null),
            variant: "secondary",
          }}
        >
          <div className="space-y-2 text-sm">
            <p><span className="text-muted">Type:</span> {callDetails.type}</p>
            <p><span className="text-muted">Time:</span> {callDetails.time}</p>
            <p><span className="text-muted">Duration:</span> {callDetails.duration}</p>
            <p><span className="text-muted">Encryption:</span> {callDetails.encryption}</p>
            <p><span className="text-muted">Key changed:</span> {callDetails.keyChanged}</p>
            <p><span className="text-muted">Fingerprint:</span> {callDetails.fingerprint}</p>
          </div>
        </Modal>
      )}

      {securityModal && (
        <Modal
          isOpen
          onClose={() => setSecurityModal(false)}
          title="Contact security"
          secondaryAction={{
            label: "Close",
            onClick: () => setSecurityModal(false),
            variant: "secondary",
          }}
        >
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">Devices</p>
              <ul className="list-disc list-inside text-muted">
                <li>iPhone 14 • iOS • Key pinned</li>
                <li>MacBook Pro • macOS • Verified</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Device public key fingerprint</p>
              <p className="font-mono text-muted">FF:EE:DD:CC:BB:AA:11:22</p>
            </div>
            <p className="text-muted">Key pinned status: Pinned</p>
            <p className="text-muted">Key created: 2025-01-10</p>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white hover:bg-white/10 transition"
            >
              Unpin key
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
