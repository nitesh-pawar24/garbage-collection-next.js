'use client';
import PaymentHistory from "@/component/PaymentHistory";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <PaymentHistory navigate={navigate} />;
}
