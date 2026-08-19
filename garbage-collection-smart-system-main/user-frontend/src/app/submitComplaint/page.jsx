'use client';
import ComplaintPage from "@/component/ComplaintPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <ComplaintPage navigate={navigate} />;
}
