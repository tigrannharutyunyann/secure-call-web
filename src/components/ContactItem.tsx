import { Link } from "react-router-dom";
import type { Contact } from "../mock/contacts";

type ContactItemProps = {
  contact: Contact;
  activePath?: string;
};

export default function ContactItem({ contact, activePath }: ContactItemProps) {
  const isActive =
    activePath === `/contacts/${contact.id}` || activePath === `/call/${contact.id}`;

  return (
    <Link
      to={`/contacts/${contact.id}`}
      className={`flex items-center gap-3 px-4 py-3 transition border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 ${
        isActive ? "bg-black/5 dark:bg-white/10" : ""
      }`}
    >
      <img
        src={contact.avatar}
        className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10"
        alt={`${contact.name} avatar`}
      />

      <div className="flex flex-col">
        <span className="text-slate-900 dark:text-white font-medium">
          {contact.name}
        </span>
        <span className="text-muted text-sm">{contact.status}</span>
      </div>

      <div className="ml-auto text-muted text-sm">{contact.lastCallTime}</div>
    </Link>
  );
}
