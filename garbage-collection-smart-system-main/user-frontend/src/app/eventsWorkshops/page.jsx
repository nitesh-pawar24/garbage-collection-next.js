'use client';
import EventsPage from "@/component/EventsPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <EventsPage navigate={navigate} />;
}
