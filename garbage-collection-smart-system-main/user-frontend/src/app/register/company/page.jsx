'use client';
import RegistrationCompany from "@/component/auth/RegistrationCompany";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <RegistrationCompany navigate={navigate} />;
}
