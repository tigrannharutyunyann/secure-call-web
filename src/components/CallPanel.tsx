import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HangIcon from "../assets/icons/call.svg";
import MicIcon from "../assets/icons/mic.svg";
import MicOffIcon from "../assets/icons/mic-off.svg";
import LockIcon from "../assets/icons/lock.svg";
import VolumeIcon from "../assets/icons/volume-2.svg";
import RefreshIcon from "../assets/icons/refresh-ccw.svg";
import TriangleAlertIcon from "../assets/icons/triangle-alert.svg";
import CircleCheckIcon from "../assets/icons/circle-check.svg";
import { contacts } from "../mock/contacts";

type CallPanelProps = {
  contactId?: string;
};

const fallbackContact = {
  id: "0",
  name: "Secure contact",
  avatar: "https://i.pravatar.cc/200?img=15",
  status: "Secure call",
};

const formatTime = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

export default function CallPanel({ contactId }: CallPanelProps) {
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [callTimer, setCallTimer] = useState(28);
  const [yourKey, setYourKey] = useState("8AF3-C90D-E22B");
  const [partnerKey, setPartnerKey] = useState("8AF3-C90D-E22B");
  const [latency, setLatency] = useState(42);
  const [jitter, setJitter] = useState(3);
  const [packetLoss, setPacketLoss] = useState(0.2);
  const [selectedMic, setSelectedMic] = useState<string>("");
  const [selectedOutput, setSelectedOutput] = useState<string>("");
  const [micList, setMicList] = useState<MediaDeviceInfo[]>([]);
  const [outputList, setOutputList] = useState<MediaDeviceInfo[]>([]);

  const contact = useMemo(
    () => contacts.find((c) => c.id === contactId) ?? fallbackContact,
    [contactId]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices?.enumerateDevices();
        if (!mounted || !devices) return;
        setMicList(devices.filter((d) => d.kind === "audioinput"));
        setOutputList(devices.filter((d) => d.kind === "audiooutput"));
      } catch {
        if (mounted) {
          setMicList([]);
          setOutputList([]);
        }
      }
    };
    loadDevices();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedMic && micList.length) {
      setSelectedMic(micList[0]?.deviceId || "");
    }
  }, [micList, selectedMic]);

  useEffect(() => {
    if (!selectedOutput && outputList.length) {
      setSelectedOutput(outputList[0]?.deviceId || "");
    }
  }, [outputList, selectedOutput]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLatency((prev) => Math.max(18, Math.min(120, prev + (Math.random() * 14 - 7))));
      setJitter((prev) => Math.max(1, Math.min(20, prev + (Math.random() * 4 - 2))));
      setPacketLoss((prev) => Math.max(0, Math.min(3.5, prev + (Math.random() * 0.6 - 0.3))));
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const refreshKeys = () => {
    const random = Math.random().toString(16).slice(2, 6).toUpperCase();
    setYourKey(`${random}-C90D-E22B`);
    setPartnerKey(`${random}-A1B2-C3D4`);
  };

  const copyKey = async (value: string) => {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      /* non-blocking */
    }
  };

  const connectionQuality = useMemo(() => {
    if (packetLoss > 2 || latency > 120) return { label: "Unstable", tone: "text-red-500", bg: "bg-red-500/10 border-red-500/30" };
    if (packetLoss > 1 || latency > 90 || jitter > 12) return { label: "Degraded", tone: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" };
    if (packetLoss > 0.3 || latency > 60 || jitter > 8) return { label: "Good", tone: "text-green-500", bg: "bg-green-500/10 border-green-500/30" };
    return { label: "Excellent", tone: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" };
  }, [jitter, latency, packetLoss]);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0B0E14] dark:via-[#0D101A] dark:to-[#0B0E14] text-slate-900 dark:text-white">
      <div className="flex-1 flex flex-col gap-4 p-5 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-4 lg:gap-6 items-stretch">
          {/* Left — call */}
          <section className="rounded-2xl bg-white/80 dark:bg-[#0f1118]/80 backdrop-blur shadow-sm border border-white/10 dark:border-white/5 p-5 sm:p-6 flex flex-col items-center gap-5 text-center">
            <div className="relative">
              <div className="absolute inset-[-10px] rounded-full bg-accent/10 blur-2xl" />
              <img
                src={contact.avatar}
                alt={contact.name}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-white/15 object-cover shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-2 items-center">
              <div>
                <h3 className="text-2xl font-semibold leading-tight">{contact.name}</h3>
                <p className="text-muted text-sm">{formatTime(callTimer)}</p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2">
                <BadgeChip label="SRTP + AES-256" tone="emerald" />
                <BadgeChip label="Keys pinned" tone="blue" />
                <BadgeChip label="Online" tone="emerald" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-2">
              <RoundButton
                icon={muted ? MicOffIcon : MicIcon}
                label={muted ? "Unmute" : "Mute"}
                active={!muted}
                onClick={() => setMuted((prev) => !prev)}
              />
              <RoundButton
                icon={VolumeIcon}
                label={speakerOn ? "Speaker on" : "Speaker off"}
                active={speakerOn}
                onClick={() => setSpeakerOn((prev) => !prev)}
              />
              <Link
                to="/contacts"
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition shadow-lg shadow-red-500/30"
                title="End call"
              >
                <img src={HangIcon} className="rotate-[135deg] w-5 h-5" alt="End call" />
              </Link>
            </div>
          </section>

          {/* Right — security */}
          <section className="rounded-2xl bg-white/80 dark:bg-[#0f1118]/80 backdrop-blur shadow-sm border border-white/10 dark:border-white/5 p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide">Secure session</p>
                <p className="text-lg font-semibold text-emerald-400">Verified & pinned</p>
              </div>
              <BadgeChip label={connectionQuality.label} tone={connectionQuality.tone.includes("red") ? "red" : "emerald"} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <KeyCard title="My key" value={yourKey} onCopy={() => copyKey(yourKey)} />
              <KeyCard title="Partner key" value={partnerKey} onCopy={() => copyKey(partnerKey)} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <SecurityRow label="Verification" value="SAS confirmed" tone="emerald" />
              <SecurityRow label="Pinning" value="Device-bound" tone="blue" />
              <SecurityRow label="Transparency" value="No changes detected" tone="emerald" />
              <SecurityRow label="Alerts" value="None" tone="muted" icon={TriangleAlertIcon} />
            </div>

            <div className="rounded-xl bg-black/5 dark:bg-white/5 px-4 py-3 flex flex-wrap items-center gap-3 text-xs text-muted border border-white/5">
              <img src={LockIcon} alt="" className="w-4 h-4" />
              <span>Fingerprint:</span>
              <code className="text-[11px] font-mono bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                3F:7A:9C:BA:E1:44:52:0C:9D:3A:DE:11:89:AF:2B:73
              </code>
              <span className="text-emerald-400 font-semibold">Trusted</span>
            </div>
          </section>
        </div>

        {/* Bottom — tech panel */}
        <section className="rounded-2xl bg-white/80 dark:bg-[#0f1118]/80 backdrop-blur shadow-sm border border-white/10 dark:border-white/5 p-5 sm:p-6 flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <StatPill label="Latency" value={`${latency.toFixed(0)} ms`} warn={latency > 90} />
            <StatPill label="Jitter" value={`${jitter.toFixed(1)} ms`} warn={jitter > 12} />
            <StatPill label="Packet loss" value={`${packetLoss.toFixed(1)}%`} warn={packetLoss > 1} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <ToggleCard
              label="Speaker output"
              icon={VolumeIcon}
              enabled={speakerOn}
              onToggle={() => setSpeakerOn((v) => !v)}
              description="Route audio to current device"
              compact
            />
            <ToggleCard
              label="Mute microphone"
              icon={muted ? MicOffIcon : MicIcon}
              enabled={!muted}
              onToggle={() => setMuted((v) => !v)}
              description="Hold to push-to-talk"
              compact
            />
            <ToggleCard
              label="Noise suppression"
              icon={CircleCheckIcon}
              enabled={noiseSuppression}
              onToggle={() => setNoiseSuppression((v) => !v)}
              description="Reduce background noise"
              compact
            />
            <ToggleCard
              label="Echo cancellation"
              icon={CircleCheckIcon}
              enabled={echoCancellation}
              onToggle={() => setEchoCancellation((v) => !v)}
              description="Prevent feedback loops"
              compact
            />
            <DeviceSelect
              label="Microphone"
              value={selectedMic}
              onChange={setSelectedMic}
              options={micList}
              placeholder="Default microphone"
            />
            <DeviceSelect
              label="Output"
              value={selectedOutput}
              onChange={setSelectedOutput}
              options={outputList}
              placeholder="System default"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-time key transparency enabled
            </div>
            <button
              onClick={refreshKeys}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition text-slate-900 dark:text-white"
            >
              <img src={RefreshIcon} alt="" className="w-4 h-4" />
              Refresh keys
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

type ToggleCardProps = {
  label: string;
  description: string;
  icon: string;
  enabled: boolean;
  onToggle: () => void;
  compact?: boolean;
};

function ToggleCard({ label, description, icon, enabled, onToggle, compact }: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-3 p-3 rounded-lg text-left transition ${
        compact
          ? enabled
            ? "bg-emerald-500/10 text-slate-900 dark:text-white"
            : "bg-black/5 dark:bg-white/5 text-muted"
          : enabled
          ? "border-accent/30 bg-accent/10 text-slate-900 dark:text-white border"
          : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-muted"
      }`}
    >
      <span className="w-10 h-10 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center">
        <img src={icon} alt="" className="w-5 h-5 opacity-80" />
      </span>
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted">{description}</p>
        <span
          className={`inline-block text-[11px] px-2 py-0.5 rounded-full border ${
            enabled
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
              : "bg-black/5 dark:bg-white/5 text-muted border-black/10 dark:border-white/10"
          }`}
        >
          {enabled ? "On" : "Off"}
        </span>
      </div>
    </button>
  );
}

type DeviceSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: MediaDeviceInfo[];
  placeholder: string;
};

function DeviceSelect({ label, value, onChange, options, placeholder }: DeviceSelectProps) {
  const hasOptions = options.length > 0;
  return (
    <label className="flex flex-col gap-1 p-3 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
      <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-md border border-black/10 dark:border-white/15 px-2 py-1.5"
      >
        {!hasOptions && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.deviceId} value={opt.deviceId}>
            {opt.label || `${label} ${opt.deviceId.slice(0, 4)}`}
          </option>
        ))}
      </select>
      {!hasOptions && <span className="text-xs text-muted">No devices reported by browser</span>}
    </label>
  );
}

type KeyCardProps = { title: string; value: string; onCopy: () => void };

function KeyCard({ title, value, onCopy }: KeyCardProps) {
  return (
    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-2">
      <p className="text-muted text-xs uppercase tracking-wide">{title}</p>
      <p className="font-mono text-base break-all text-slate-900 dark:text-white">{value}</p>
      <button
        type="button"
        onClick={onCopy}
        className="text-xs text-accent hover:text-[#256bc7] inline-flex items-center gap-1"
      >
        Copy
      </button>
    </div>
  );
}

type StatPillProps = { label: string; value: string; warn?: boolean };

function StatPill({ label, value, warn }: StatPillProps) {
  return (
    <div className={`rounded-lg px-3 py-2 text-sm ${warn ? "bg-amber-500/10 text-amber-500" : "bg-black/5 dark:bg-white/5 text-slate-900 dark:text-white"}`}>
      <p className="text-xs text-muted">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

type BadgeChipProps = { label: string; tone: "emerald" | "blue" | "red" | string };

function BadgeChip({ label, tone }: BadgeChipProps) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-500/10 text-emerald-400"
      : tone === "blue"
      ? "bg-blue-500/10 text-blue-400"
      : tone === "red"
      ? "bg-red-500/10 text-red-400"
      : tone.includes("red")
      ? "bg-red-500/10 text-red-400"
      : "bg-emerald-500/10 text-emerald-400";
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${toneClass}`}>
      {label}
    </span>
  );
}

type RoundButtonProps = { icon: string; label: string; active?: boolean; onClick: () => void };

function RoundButton({ icon, label, active = true, onClick }: RoundButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg ${
        active ? "bg-accent hover:bg-[#256bc7] shadow-accent/30 text-white" : "bg-black/10 dark:bg-white/10 text-muted"
      }`}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
    </button>
  );
}

type SecurityRowProps = { label: string; value: string; tone?: "emerald" | "blue" | "muted"; icon?: string };

function SecurityRow({ label, value, tone = "emerald", icon }: SecurityRowProps) {
  const toneClass =
    tone === "emerald" ? "text-emerald-400" : tone === "blue" ? "text-blue-400" : "text-muted";
  return (
    <div className="flex items-center justify-between rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
      <div className="text-xs text-muted">{label}</div>
      <div className={`flex items-center gap-2 text-sm font-semibold ${toneClass}`}>
        {icon && <img src={icon} alt="" className="w-4 h-4 opacity-80" />}
        {value}
      </div>
    </div>
  );
}
