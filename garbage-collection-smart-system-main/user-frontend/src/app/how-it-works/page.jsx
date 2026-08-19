'use client';
import HowItWorksPage from "@/component/HowItWorksPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <HowItWorksPage navigate={navigate} />;
}
