import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../theme/ThemeContext";
import { deviceSessions, type DeviceSession } from "../mock/devices";
import MicIcon from "../assets/icons/mic.svg?react";
import VolumeIcon from "../assets/icons/volume-2.svg?react";
import Modal from "./Modal";
import CircleIcon from "../assets/icons/circle.svg?react";
import CircleCheckIcon from "../assets/icons/circle-check.svg?react";
import TrashIcon from "../assets/icons/trash-2.svg?react";
import LogoutIcon from "../assets/icons/log-out.svg?react";
import ChevronDown from "../assets/icons/chevron-down.svg?react";

const encryptionOptions = [
  {
    value: "aes",
    label: "AES-256",
    desc: "Standard symmetric encryption for media streams.",
  },
  {
    value: "dh-aes",
    label: "Diffie-Hellman + AES",
    desc: "Ephemeral key exchange with strong symmetric cipher.",
  },
  {
    value: "rsa",
    label: "RSA-2048",
    desc: "Asymmetric key exchange, suitable for signaling.",
  },
  {
    value: "custom",
    label: "Custom (future)",
    desc: "Reserved for advanced protocols or plugins.",
  },
];

export default function SettingsPanel() {
  const [name, setName] = useState("Secure Caller");
  const [email, setEmail] = useState("user@example.com");
  const [status, setStatus] = useState("Available");
  const statusOptions = ["Available", "Do not disturb", "Invisible", "Secure only", "Busy"];
  const [encryption, setEncryption] = useState("dh-aes");
  const [toast, setToast] = useState<string | null>(null);
  const [devices, setDevices] = useState<DeviceSession[]>(() => deviceSessions);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [callSounds, setCallSounds] = useState<boolean>(() => {
    const stored = localStorage.getItem("secure-call-call-sounds");
    return stored ? stored === "true" : true;
  });
  const [micDevice, setMicDevice] = useState<string>(() => localStorage.getItem("secure-call-mic") || "");
  const [speakerDevice, setSpeakerDevice] = useState<string>(() => localStorage.getItem("secure-call-speaker") || "");
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([]);
  const [testingMic, setTestingMic] = useState(false);
  const [testingSpeaker, setTestingSpeaker] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "", error: "" });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isSpeakerOpen, setIsSpeakerOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleMic = () => setIsMicOpen((prev) => !prev);
  const toggleSpeaker = () => setIsSpeakerOpen((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("secure-call-call-sounds", String(callSounds));
  }, [callSounds]);

  useEffect(() => {
    if (micDevice) {
      localStorage.setItem("secure-call-mic", micDevice);
    }
  }, [micDevice]);

  useEffect(() => {
    if (speakerDevice) {
      localStorage.setItem("secure-call-speaker", speakerDevice);
      if (audioRef.current && "setSinkId" in audioRef.current) {
        const sinkSetter = audioRef.current as HTMLAudioElement & { setSinkId?: (id: string) => Promise<void> };
        sinkSetter.setSinkId?.(speakerDevice).catch(() => {});
      }
    }
  }, [speakerDevice]);

  useEffect(() => {
    let mounted = true;
    const loadDevices = async () => {
      try {
        const devs = await navigator.mediaDevices?.enumerateDevices();
        if (!mounted || !devs) return;
        setAudioInputs(devs.filter((d) => d.kind === "audioinput"));
        setAudioOutputs(devs.filter((d) => d.kind === "audiooutput"));
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
    if (!micDevice && micOptions.length > 0) {
      setMicDevice(micOptions[0].deviceId || "");
    }
  }, [micOptions, micDevice]);

  useEffect(() => {
    if (!speakerDevice && speakerOptions.length > 0) {
      setSpeakerDevice(speakerOptions[0].deviceId || "");
    }
  }, [speakerOptions, speakerDevice]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const selectedDevice = useMemo(
    () => devices.find((d) => d.id === selectedDeviceId) || null,
    [devices, selectedDeviceId]
  );

  const endSession = (deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    setSelectedDeviceId(null);
    setToast("Session ended successfully.");
  };

  const saveProfile = () => {
    console.log("Saving profile", { name, email, status });
  };

  const saveEncryption = () => {
    console.log("Saving encryption", encryption);
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={avatar || "https://i.pravatar.cc/100?img=33"}
              alt="avatar"
              className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 object-cover"
            />
            <div className="flex flex-col gap-2">
              <div className="text-muted text-sm">Update your display information for calls.</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  Change avatar
                </button>
                {avatar && (
                  <button
                    type="button"
                    onClick={() => setAvatar(null)}
                    className="px-3 py-2 rounded-lg border border-red-300 text-red-500 text-sm hover:bg-red-500/10 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setAvatar(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted">Display name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none"
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted">Status</span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => {
                  const isActive = status === opt;
                  const color =
                    opt === "Available"
                      ? "bg-emerald-500"
                      : opt === "Do not disturb"
                      ? "bg-red-500"
                      : opt === "Invisible"
                      ? "bg-slate-500"
                      : opt === "Secure only"
                    ? "bg-accent"
                    : "bg-amber-500";
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      className={`px-3.5 py-2 rounded-lg text-sm border border-black/10 dark:border-white/10 flex items-center gap-2 transition ${
                        isActive
                          ? `${color} text-black shadow-md shadow-black/10`
                          : "bg-black/5 dark:bg-[#1A1A1A] text-muted hover:bg-black/10 dark:hover:bg-white/10"
                      }`}
                    >
                      {isActive ? (
                        <CircleCheckIcon className="w-4 h-4 text-black" />
                      ) : (
                        <CircleIcon className="w-4 h-4 text-muted" />
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </label>
          </div>
          <button
            onClick={saveProfile}
            className="mt-4 btn-primary inline-flex items-center justify-center"
          >
            Save profile
          </button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Encryption</h2>
          <div className="space-y-3">
            {encryptionOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
              >
                <input
                  type="radio"
                  name="encryption"
                  value={option.value}
                  checked={encryption === option.value}
                  onChange={(e) => setEncryption(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-muted">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={saveEncryption}
            className="mt-4 btn-primary inline-flex items-center justify-center"
          >
            Save encryption settings
          </button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted">
                  Current theme: {theme === "dark" ? "Dark" : "Light"}
                </p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted">Switch interface language.</p>
              </div>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm text-slate-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                Change language
              </button>
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Change password</h2>
          <div className="space-y-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Current password</span>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">New password</span>
              <input
                type="password"
                value={passwords.next}
                onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Confirm new password</span>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none"
              />
            </label>
            {passwords.error && <p className="text-sm text-red-500">{passwords.error}</p>}
            <button
              type="button"
              onClick={() => {
                if (passwords.next.length < 8) {
                  setPasswords((p) => ({ ...p, error: "Password must be at least 8 characters" }));
                  return;
                }
                if (passwords.next !== passwords.confirm) {
                  setPasswords((p) => ({ ...p, error: "Passwords do not match" }));
                  return;
                }
                setPasswords({ current: "", next: "", confirm: "", error: "" });
                setToast("Password updated (demo only)");
              }}
              className="btn-primary inline-flex items-center justify-center"
            >
              Update password
            </button>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Devices</h2>
          <p className="text-sm text-muted mb-4">
            View and manage devices logged into your Secure Call account.
          </p>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {devices.map((device) => (
              <button
                key={device.id}
                type="button"
                onClick={() => setSelectedDeviceId(device.id)}
                className="w-full text-left p-3 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-semibold">
                  {device.platform.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{device.name}</p>
                    {device.current && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    Last active: {device.lastActive} • {device.location.city}, {device.location.country}
                  </p>
                </div>
                <div className="text-sm text-muted">{device.ip}</div>
              </button>
            ))}
            {devices.length === 0 && <p className="text-sm text-muted">No active sessions</p>}
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Account security</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-factor authentication</p>
              <p className="text-sm text-muted">
                Two-factor authentication: {twoFAEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTwoFAModal(true)}
              className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm text-slate-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
            >
              {twoFAEnabled ? "Disable / Update" : "Enable 2FA"}
            </button>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Calls</h2>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable call sounds</p>
                <p className="text-sm text-muted">Turn on/off sound feedback for calls.</p>
              </div>
              <button
                type="button"
                onClick={() => setCallSounds((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                <span className="w-10 h-5 flex items-center rounded-full bg-black/10 dark:bg-white/20 p-[2px]">
                  <span
                    className={`h-4 w-4 rounded-full bg-accent transition-transform ${
                      callSounds ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
                <span className="text-sm text-muted">{callSounds ? "On" : "Off"}</span>
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Microphone input device</p>
              <p className="text-sm text-muted">Select the device used to capture audio.</p>
              <div className="relative">
                <div
                  onClick={toggleMic}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  <span className="text-sm">
                    {micOptions.find((d) => d.deviceId === micDevice)?.label || micOptions[0]?.label || "Microphone"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${isMicOpen ? "rotate-180" : ""} mr-[2px]`}
                  />
                </div>
                {isMicOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/80 dark:bg-[#0f1f2b] backdrop-blur-sm shadow-xl">
                    {micOptions.length === 0 && (
                      <div className="px-4 py-2 text-sm text-muted">No inputs found</div>
                    )}
                    {micOptions.map((dev) => (
                      <button
                        key={dev.deviceId || dev.label}
                        type="button"
                        onClick={() => {
                          setMicDevice(dev.deviceId);
                          setIsMicOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-black/20 dark:hover:bg-white/10 transition"
                      >
                        {dev.label || "Microphone"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Speaker output device</p>
              <p className="text-sm text-muted">Select the device used for call audio playback.</p>
              <div className="relative">
                <div
                  onClick={toggleSpeaker}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  <span className="text-sm">
                    {speakerOptions.find((d) => d.deviceId === speakerDevice)?.label ||
                      speakerOptions[0]?.label ||
                      "Speaker"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${isSpeakerOpen ? "rotate-180" : ""} mr-[2px]`}
                  />
                </div>
                {isSpeakerOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/80 dark:bg-[#0f1f2b] backdrop-blur-sm shadow-xl">
                    {speakerOptions.length === 0 && (
                      <div className="px-4 py-2 text-sm text-muted">No outputs found</div>
                    )}
                    {speakerOptions.map((dev) => (
                      <button
                        key={dev.deviceId || dev.label}
                        type="button"
                        onClick={() => {
                          setSpeakerDevice(dev.deviceId);
                          setIsSpeakerOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-black/20 dark:hover:bg-white/10 transition"
                      >
                        {dev.label || "Speaker"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setTestingMic(true);
                  setTimeout(() => {
                    setTestingMic(false);
                    setToast("Microphone test successful");
                  }, 800);
                }}
                className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition text-sm flex items-center gap-2"
              >
                {testingMic ? (
                  <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                ) : (
                  <MicIcon className="w-4 h-4 text-accent" />
                )}
                Test microphone
              </button>
              <button
                type="button"
                onClick={() => {
                  setTestingSpeaker(true);
                  if (audioRef.current) {
                    audioRef.current.src =
                      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
                    audioRef.current.play().catch(() => {});
                  }
                  setTimeout(() => {
                    setTestingSpeaker(false);
                    setToast("Speaker test played");
                  }, 800);
                }}
                className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition text-sm flex items-center gap-2"
              >
                {testingSpeaker ? (
                  <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                ) : (
                  <VolumeIcon className="w-4 h-4 text-accent" />
                )}
                Test speaker
              </button>
            </div>
          </div>
        </div>
        <audio ref={audioRef} className="hidden" />
      </div>

      <div className="max-w-4xl mx-auto p-8 pt-0">
        <div className="panel p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Logout</h2>
          <p className="text-sm text-muted mb-3">
            Log out of Secure Call.
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-lg shadow-red-500/20 inline-flex items-center gap-2"
          >
            <LogoutIcon className="w-4 h-4" />
            Log out
          </button>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-3">Delete account</h2>
          <p className="text-sm text-muted mb-4">
            Deleting your Secure Call account is permanent and cannot be undone.
          </p>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-lg shadow-red-500/20 inline-flex items-center gap-2"
          >
            <TrashIcon className="w-4 h-4" />
            Delete account
          </button>
        </div>
      </div>

      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="panel bg-white dark:bg-[#0f1f2b] border border-black/10 dark:border-white/10 max-w-lg w-full p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center text-lg font-semibold">
                {selectedDevice.platform.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold">{selectedDevice.name}</p>
                <p className="text-sm text-muted">Last active: {selectedDevice.lastActive}</p>
              </div>
              {selectedDevice.current && (
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  This device
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">IP Address</p>
                <p>{selectedDevice.ip}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Location</p>
                <p>
                  {selectedDevice.location.city}, {selectedDevice.location.country}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Logged in</p>
                <p>{selectedDevice.loginDate}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">App version</p>
                <p>{selectedDevice.version}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Platform</p>
                <p>{selectedDevice.platform}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Browser</p>
                <p>{selectedDevice.browser || "—"}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
                onClick={() => setSelectedDeviceId(null)}
              >
                Close
              </button>
              <button
                type="button"
                disabled={selectedDevice.current}
                onClick={() => {
                  if (selectedDevice.current) return;
                  const confirmEnd = window.confirm(
                    "Are you sure you want to end this session? The device will be logged out."
                  );
                  if (!confirmEnd) return;
                  endSession(selectedDevice.id);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedDevice.current
                    ? "bg-red-500/40 text-white/70 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20"
                }`}
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {showTwoFAModal && (
        <Modal
          isOpen={showTwoFAModal}
          onClose={() => setShowTwoFAModal(false)}
          title="Enable Two-Factor Authentication"
          secondaryAction={{
            label: "Cancel",
            onClick: () => setShowTwoFAModal(false),
            variant: "secondary",
          }}
          primaryAction={{
            label: "Confirm",
            onClick: () => {
              setTwoFAEnabled(true);
              setShowTwoFAModal(false);
              setTwoFACode("");
              setToast("Two-factor authentication enabled");
            },
          }}
        >
          <p>Enter the code sent to your email to enable 2FA. (Demo input only.)</p>
          <input
            type="text"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none text-sm"
            placeholder="Enter code"
          />
        </Modal>
      )}

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title="Log out"
          secondaryAction={{
            label: "Cancel",
            onClick: () => setShowLogoutModal(false),
            variant: "secondary",
          }}
          primaryAction={{
            label: "Log out",
            variant: "danger",
            onClick: () => navigate("/login"),
          }}
        >
          <p>Are you sure you want to log out of your Secure Call account?</p>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete account"
          secondaryAction={{
            label: "Cancel",
            onClick: () => setShowDeleteModal(false),
            variant: "secondary",
          }}
          primaryAction={{
            label: "Delete",
            variant: "danger",
            onClick: () => {
              const deleteAccount = () => {
                // placeholder for deletion logic
              };
              deleteAccount();
              setShowDeleteModal(false);
            },
          }}
        >
          <p>Are you sure you want to permanently delete your account? This action cannot be undone.</p>
          <div className="space-y-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Email</span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email to confirm"
                  className="w-full px-4 py-3 pr-28 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none text-sm"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-xs px-3 py-2 rounded-md bg-accent text-black shadow-md shadow-accent/20 hover:brightness-110 transition"
                  onClick={() => setToast("Code sent (demo)")}
                >
                  Send code
                </button>
              </div>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Confirmation code</span>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none text-sm"
              />
            </label>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
