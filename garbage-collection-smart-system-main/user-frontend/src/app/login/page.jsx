'use client';
import LoginPage from "@/component/auth/LoginPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <LoginPage navigate={navigate} />;
}
