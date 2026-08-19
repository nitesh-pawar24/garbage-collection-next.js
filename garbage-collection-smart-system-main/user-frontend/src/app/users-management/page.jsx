'use client';
import UsersManagement from "@/component/management/UsersManagement";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <UsersManagement navigate={navigate} />;
}
