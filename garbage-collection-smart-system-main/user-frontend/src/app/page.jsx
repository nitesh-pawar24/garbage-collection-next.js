'use client';
import Home from "@/component/Home";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <Home navigate={navigate} />;
}
