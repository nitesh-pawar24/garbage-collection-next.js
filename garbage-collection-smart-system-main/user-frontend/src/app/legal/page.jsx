'use client';
import LegalTransparencyPage from "@/component/LegalTransparencyPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <LegalTransparencyPage navigate={navigate} />;
}
