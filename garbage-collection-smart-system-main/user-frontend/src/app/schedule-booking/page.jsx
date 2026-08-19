'use client';
import ScheduleBooking from "@/component/ScheduleBooking";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <ScheduleBooking navigate={navigate} />;
}
