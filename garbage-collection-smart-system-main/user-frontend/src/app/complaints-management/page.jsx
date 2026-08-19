'use client';
import ComplaintsManagement from "@/component/management/ComplaintsManagement";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <ComplaintsManagement navigate={navigate} />;
}
