'use client';
import LoginHousehold from "@/component/auth/LoginHousehold";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <LoginHousehold navigate={navigate} />;
}
