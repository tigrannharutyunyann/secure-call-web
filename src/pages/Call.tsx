import { useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CallPanel from "../components/CallPanel";

export default function Call() {
  const { id } = useParams<{ id: string }>();

  return (
    <AppLayout>
      <CallPanel contactId={id} />
    </AppLayout>
  );
}
