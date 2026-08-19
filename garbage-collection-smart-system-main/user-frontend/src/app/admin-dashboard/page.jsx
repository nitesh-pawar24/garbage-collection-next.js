'use client';
import AdminDashboard from "@/component/dashboard/AdminDashboard";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <AdminDashboard navigate={navigate} />;
}
