'use client';
import ViewSchedulePage from "@/component/ViewSchedulePage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <ViewSchedulePage navigate={navigate} />;
}
