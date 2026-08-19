'use client';
import HouseholdDashboard from "@/component/dashboard/HouseholdDashboard";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <HouseholdDashboard navigate={navigate} />;
}
