'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      } else {
        setIsAuth(true);
      }
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return <LoadingSpinner />;
  }

  return isAuth ? children : null;
}
