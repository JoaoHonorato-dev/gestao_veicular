import Link from "next/link";

export function SiteHeader() {
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
          <span className="hidden sm:inline">App Router · Prisma · PG</span>
        </nav>
      </div>
    </header>
  );
}
