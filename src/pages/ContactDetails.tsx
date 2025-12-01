import { useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CallHistoryPanel from "../components/CallHistoryPanel";
import { contacts } from "../mock/contacts";
import { historyByContact } from "../mock/history";

export default function ContactDetails() {
  const { id } = useParams<{ id: string }>();

  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center text-muted">
          Contact not found
        </div>
      </AppLayout>
    );
  }

  const history = historyByContact[contact.id] ?? [];

  return (
    <AppLayout>
      <CallHistoryPanel contact={contact} history={history} />
    </AppLayout>
  );
}
