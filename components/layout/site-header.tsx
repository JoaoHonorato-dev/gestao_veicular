"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { clearSession, getSessionUser, type SessionUser } from "@/lib/auth";

export function SiteHeader() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Gestão de Veículos
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
          {user ? (
            <>
              <span className="hidden sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-neutral-200 px-3 py-1 text-xs font-medium transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
