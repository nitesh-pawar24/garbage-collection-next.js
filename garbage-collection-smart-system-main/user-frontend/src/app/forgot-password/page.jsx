'use client';
import ForgotPasswordPage from "@/component/auth/ForgotPasswordPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <ForgotPasswordPage navigate={navigate} />;
}
