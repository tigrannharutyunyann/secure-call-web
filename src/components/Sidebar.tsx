import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactItem from "./ContactItem";
import { contacts } from "../mock/contacts";
import PlusIcon from "../assets/icons/plus (1).svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import Logo from "../assets/logo/logo_transparent.png";
import Modal from "./Modal";

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query.trim()) return contacts;
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <aside className="relative w-[320px] border-r border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#111111]/90 backdrop-blur-lg flex flex-col min-h-screen">
      <div className="p-4 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate("/contacts")}
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <img src={Logo} alt="Secure Call" className="w-8 h-8 object-contain rounded-lg" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Secure Call</span>
          </button>
          <Link
            to="/settings"
            className={`flex items-center justify-center w-9 h-9 rounded-full bg-[#1a1f23] border border-white/10 text-white/80 transition hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-black/20 ${
              location.pathname.startsWith("/settings")
                ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(92,225,230,0.4)]"
                : ""
            }`}
            aria-label="Settings"
          >
            <SettingsIcon className="w-[18px] h-[18px]" />
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-black/5 dark:bg-[#1A1A1A] text-slate-900 dark:text-white px-4 py-2 rounded-lg outline-none border border-black/10 dark:border-white/10 focus:border-accent"
        />
      
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((contact) => (
          <ContactItem key={contact.id} contact={contact} activePath={location.pathname} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted text-sm p-4">No contacts found</p>
        )}
      </div>

       {/* Add contact floating button */}
      <div className="absolute right-4 bottom-4">
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-full bg-accent text-black shadow-lg shadow-accent/30 flex items-center justify-center hover:scale-[1.05] transition"
          aria-label="Add contact"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <Modal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add contact"
        secondaryAction={{
          label: "Cancel",
          onClick: () => setShowAdd(false),
          variant: "secondary",
        }}
        primaryAction={{
          label: "Add",
          onClick: () => {
            setShowAdd(false);
            setNewEmail("");
            setNewName("");
          },
        }}
      >
        <div className="space-y-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Email</span>
            <input
              type="email"
              placeholder="email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Display name</span>
            <input
              type="text"
              placeholder="Display name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 focus:border-accent outline-none text-sm"
            />
          </label>
        </div>
      </Modal>
    </aside>
  );
}
