'use client';
import SystemSettings from "@/component/management/SystemSettings";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <SystemSettings navigate={navigate} />;
}
