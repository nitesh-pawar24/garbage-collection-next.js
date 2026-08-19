'use client';
import FAQsPage from "@/component/FAQsPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <FAQsPage navigate={navigate} />;
}
