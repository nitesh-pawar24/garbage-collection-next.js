'use client';
import RegistrationHousehold from "@/component/auth/RegistrationHousehold";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <RegistrationHousehold navigate={navigate} />;
}
