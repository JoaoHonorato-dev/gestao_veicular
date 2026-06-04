"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PageLoader } from "@/components/ui/page-loader";
import { getSessionUser, type SessionUser } from "@/lib/auth";

export default function PagePrincipal() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSessionUser();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setLoading(false);
  }, [router]);

  if (loading || !user) {
    return <PageLoader label="Validando usuário..." />;
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <section className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-sm font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">
          Bem-vindo
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Olá, {user.name}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Acesse o painel de rastreamento para acompanhar a frota em tempo real.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-500/25 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Abrir dashboard de rastreamento
        </Link>

        <p className="mt-4 text-xs text-neutral-500">
          Logado como {user.email}
        </p>
      </section>
    </div>
  );
}
