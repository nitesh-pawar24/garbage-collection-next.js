'use client';
import LoginCompany from "@/component/auth/LoginCompany";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <LoginCompany navigate={navigate} />;
}
