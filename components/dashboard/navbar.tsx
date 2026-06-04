"use client";

import { useRouter } from "next/navigation";

import { clearSession, type SessionUser } from "@/lib/auth";

type NavbarProps = {
  user: SessionUser;
  onMenuClick: () => void;
};

export function DashboardNavbar({ user, onMenuClick }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-neutral-200 bg-white/90 px-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-50 lg:hidden dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
          aria-label="Abrir menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Dashboard
          </h1>
          <p className="hidden text-xs text-neutral-500 sm:block">
            Monitoramento da frota
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
            {user.name}
          </p>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-700 dark:text-sky-400">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
