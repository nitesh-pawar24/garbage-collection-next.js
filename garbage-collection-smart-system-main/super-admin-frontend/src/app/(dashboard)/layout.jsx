'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import Layout from "@/components/Layout";

export default function DashboardSectionLayout({ children }) {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setAuthLoading(false);
      } catch {
        if (typeof window !== 'undefined') {
          router.replace("/login");
        }
      }
    };
    checkAuth();
  }, [router]);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 44, height: 44, border: "3px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1", borderRadius: "50%" }} className="animate-spin" />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "Inter, sans-serif" }}>Verifying session…</span>
      </div>
    );
  }

  return <Layout>{children}</Layout>;
}
