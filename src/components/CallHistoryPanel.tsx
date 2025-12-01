import { Link } from "react-router-dom";
import CallIcon from "../assets/icons/call.svg";
import type { Contact } from "../mock/contacts";
import type { CallHistoryEntry } from "../mock/history";

type CallHistoryPanelProps = {
  contact: Contact;
  history: CallHistoryEntry[];
};

export default function CallHistoryPanel({
  contact,
  history,
}: CallHistoryPanelProps) {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0D0D0D] text-slate-900 dark:text-white">
      <div className="h-16 border-b border-black/5 dark:border-white/10 flex items-center px-6 justify-between bg-white/60 dark:bg-[#0F1016]/70 backdrop-blur">
        <div>
          <h2 className="text-lg font-semibold">{contact.name}</h2>
          <p className="text-sm text-green-500">{contact.status}</p>
        </div>

        <Link
          to={`/call/${contact.id}`}
          className="w-10 h-10 rounded-full bg-accent hover:bg-[#256bc7] flex items-center justify-center transition shadow-lg shadow-accent/30"
        >
          <img src={CallIcon} className="w-5 h-5" alt="call" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center text-muted">
        Select a record to view details
      </div>

      <div className="pb-10 flex flex-col items-center gap-6">
        {history.map((entry) => (
          <div className="flex flex-col items-center" key={entry.id}>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              {entry.timestamp}
            </p>
            <div
              className={`px-6 py-2 rounded-full shadow-lg border ${
                entry.type === "voice"
                  ? "bg-green-500/15 text-white border-green-500/20"
                  : "bg-red-500/15 text-white border-red-500/20"
              }`}
            >
              {entry.type === "voice"
                ? `Voice call (${entry.duration ?? "--:--"})`
                : "Missed call"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
