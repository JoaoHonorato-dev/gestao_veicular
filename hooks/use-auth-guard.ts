"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getSessionUser, type SessionUser } from "@/lib/auth";

export function useAuthGuard(redirectTo = "/login") {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSessionUser();
    if (!session) {
      router.replace(redirectTo);
      return;
    }
    setUser(session);
    setLoading(false);
  }, [router, redirectTo]);

  return { user, loading };
}
