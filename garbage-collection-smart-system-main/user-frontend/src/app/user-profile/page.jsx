'use client';
import UserProfile from "@/component/UserProfile";
import { useAppNavigate } from "@/context/NavigationContext";

export default function Page() {
  const navigate = useAppNavigate();
  return <UserProfile navigate={navigate} />;
}
