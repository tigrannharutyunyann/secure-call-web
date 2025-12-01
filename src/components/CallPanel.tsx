import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CallIcon from "../assets/icons/call.svg";
import HangIcon from "../assets/icons/hangup.svg";
import MicIcon from "../assets/icons/mic.svg";
import MicOffIcon from "../assets/icons/mic-off.svg";
import LockIcon from "../assets/icons/lock.svg";
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
  const [callTimer, setCallTimer] = useState(28);
  const [yourKey, setYourKey] = useState("8AF3-C90D-E22B");
  const [partnerKey, setPartnerKey] = useState("8AF3-C90D-E22B");

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

  const refreshKeys = () => {
    const random = Math.random().toString(16).slice(2, 6).toUpperCase();
    setYourKey(`${random}-C90D-E22B`);
    setPartnerKey(`${random}-A1B2-C3D4`);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0B0E14] dark:via-[#0D101A] dark:to-[#0B0E14] text-slate-900 dark:text-white">
      <div className="h-16 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 bg-white/70 dark:bg-[#0F1016]/70 backdrop-blur">
        <div>
          <h2 className="text-lg font-semibold">{contact.name}</h2>
          <p className="text-green-500 text-sm">Online - Connected</p>
        </div>

        <button className="text-gray-500 dark:text-gray-300 hover:text-white transition text-xl">
          ...
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="relative">
          <div className="absolute inset-[-14px] rounded-full bg-accent/10 blur-2xl" />
          <img
            src={contact.avatar}
            alt={contact.name}
            className="relative w-36 h-36 rounded-full border-4 border-white/40 dark:border-white/10 shadow-2xl"
          />
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold">{contact.name}</h3>
          <p className="text-muted mt-1">{formatTime(callTimer)}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted((prev) => !prev)}
            className="w-14 h-14 rounded-full bg-black/5 dark:bg-[#1A1A1A] hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition border border-black/10 dark:border-white/10 shadow"
          >
            <img
              src={muted ? MicOffIcon : MicIcon}
              className="w-6 h-6 opacity-90"
              alt="mute"
            />
          </button>

          <button className="w-14 h-14 rounded-full bg-accent hover:bg-[#256bc7] flex items-center justify-center transition shadow-lg shadow-accent/30">
            <img src={CallIcon} className="w-6 h-6" alt="call" />
          </button>

          <Link
            to="/contacts"
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition shadow-lg shadow-red-500/30"
          >
            <img src={HangIcon} className="w-6 h-6" alt="hang up" />
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#101010] border-t border-black/5 dark:border-white/10 p-6">
        <div className="flex items-center gap-2 justify-center text-success font-medium">
          <img src={LockIcon} alt="lock" className="w-4 h-4" />
          <span>Secure connection active</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-900 dark:text-white">
          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <p className="text-muted text-xs mb-1">Your key</p>
            <p className="font-mono text-base">{yourKey}</p>
          </div>

          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <p className="text-muted text-xs mb-1">Partner key</p>
            <p className="font-mono text-base">{partnerKey}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
          <button
            onClick={refreshKeys}
            className="px-4 py-2 rounded-md bg-black/5 dark:bg-[#1A1A1A] hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition text-slate-900 dark:text-white"
          >
            Refresh keys
          </button>

          <button
            onClick={() => console.log("More info")}
            className="px-4 py-2 rounded-md bg-black/5 dark:bg-[#1A1A1A] hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition text-slate-900 dark:text-white"
          >
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
