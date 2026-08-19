'use client';
import RegisterPage from "@/component/RegisterPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <RegisterPage navigate={navigate} />;
}
