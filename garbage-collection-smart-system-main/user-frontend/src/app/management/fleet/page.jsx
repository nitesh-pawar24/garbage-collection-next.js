'use client';
import FleetManagement from "@/component/management/FleetManagement";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <FleetManagement navigate={navigate} />;
}
