'use client';
import GuidesResourcesPage from "@/component/GuidesResourcesPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <GuidesResourcesPage navigate={navigate} />;
}
