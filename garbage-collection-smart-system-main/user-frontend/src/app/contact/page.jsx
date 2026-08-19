'use client';
import Contact from "@/component/Contact";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <Contact navigate={navigate} />;
}
