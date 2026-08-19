'use client';
import StatisticsPage from "@/component/StatisticsPage";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <StatisticsPage navigate={navigate} />;
}
