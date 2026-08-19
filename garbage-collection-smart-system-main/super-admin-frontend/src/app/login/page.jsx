'use client';
import Login from "@/views/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return <Login onLoginSuccess={() => router.push('/dashboard')} />;
}
