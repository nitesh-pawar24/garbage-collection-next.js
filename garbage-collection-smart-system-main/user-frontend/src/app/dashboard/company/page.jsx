'use client';
import CompanyDashboard from "@/component/dashboard/CompanyDashboard";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <CompanyDashboard navigate={navigate} />;
}
