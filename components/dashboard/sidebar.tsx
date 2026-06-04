"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

/** Itens do menu — href vazio = ainda não implementado */
const navItems = [
  { label: "Visão geral", href: "/dashboard" },
  { label: "Veículos (CRUD)", href: "/dashboard/veiculos" },
  { label: "Mapa ao vivo", href: "", disabled: true },
  { label: "Alertas", href: "", disabled: true },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 dark:border-neutral-800 dark:bg-neutral-950 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-5 dark:border-neutral-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-sm font-bold text-white">
            GV
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              Gestão Veículos
            </p>
            <p className="text-xs text-neutral-500">Rastreamento</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive =
              !item.disabled && item.href && pathname === item.href;

            const className = `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium ${
              item.disabled
                ? "cursor-not-allowed text-neutral-400 dark:text-neutral-600"
                : isActive
                  ? "bg-sky-500/10 text-sky-700 dark:text-sky-400"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            }`;

            if (item.disabled || !item.href) {
              return (
                <span key={item.label} className={className} title="Em breve">
                  {item.label}
                  <span className="ml-auto text-[10px] uppercase tracking-wide text-neutral-400">
                    breve
                  </span>
                </span>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <p className="text-xs text-neutral-500">
            Frota monitorada em tempo real
          </p>
        </div>
      </aside>
    </>
  );
}
