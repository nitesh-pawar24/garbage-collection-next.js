'use client';
import CompaniesManagement from "@/component/management/CompaniesManagement";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <CompaniesManagement navigate={navigate} />;
}
