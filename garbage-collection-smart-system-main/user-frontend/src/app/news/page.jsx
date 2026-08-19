'use client';
import NewsUpdatesPage from "@/component/NewsUpdatesPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <NewsUpdatesPage navigate={navigate} />;
}
