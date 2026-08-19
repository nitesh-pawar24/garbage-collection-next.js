'use client';
import About from "@/component/About";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <About navigate={navigate} />;
}
