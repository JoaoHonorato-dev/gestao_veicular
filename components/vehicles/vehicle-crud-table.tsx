"use client";

/**
 * Tabela responsiva do CRUD.
 * Em telas pequenas vira "cards"; em telas maiores, tabela tradicional.
 */

import { StatusBadge } from "@/components/ui/status-badge";
import type { VehicleListItem } from "@/types/vehicle";

type VehicleCrudTableProps = {
  vehicles: VehicleListItem[];
  loading?: boolean;
  deletingId?: number | null;
  onEdit: (vehicle: VehicleListItem) => void;
  onDelete: (id: number) => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Mapeia ONLINE/OFFLINE do banco para o badge da UI */
function statusForBadge(status: VehicleListItem["status"]) {
  return status === "ONLINE" ? "online" : "offline";
}

export function VehicleCrudTable({
  vehicles,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: VehicleCrudTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-300 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
        Nenhum veículo cadastrado. Clique em &quot;Novo veículo&quot; para começar.
      </p>
    );
  }

  return (
    <>
      {/* Versão mobile: cards empilhados */}
      <div className="space-y-3 md:hidden">
        {vehicles.map((v) => (
          <article
            key={v.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono font-semibold text-neutral-900 dark:text-neutral-50">
                  {v.plate}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {v.model}
                </p>
              </div>
              <StatusBadge status={statusForBadge(v.status)} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-neutral-500">
              <div>
                <dt>Motorista</dt>
                <dd className="font-medium text-neutral-800 dark:text-neutral-200">
                  {v.driver}
                </dd>
              </div>
              <div>
                <dt>Cadastro</dt>
                <dd className="font-medium text-neutral-800 dark:text-neutral-200">
                  {formatDate(v.createdAt)}
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex gap-2">
              <ActionButton label="Editar" onClick={() => onEdit(v)} />
              <ActionButton
                label="Excluir"
                variant="danger"
                loading={deletingId === v.id}
                onClick={() => onDelete(v.id)}
              />
            </div>
          </article>
        ))}
      </div>

      {/* Versão desktop: tabela */}
      <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 md:block dark:border-neutral-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3">Placa</th>
              <th className="px-4 py-3">Modelo</th>
              <th className="px-4 py-3">Motorista</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Cadastro</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {vehicles.map((v) => (
              <tr
                key={v.id}
                className="bg-white dark:bg-neutral-950"
              >
                <td className="px-4 py-3 font-mono font-medium">{v.plate}</td>
                <td className="px-4 py-3">{v.model}</td>
                <td className="px-4 py-3">{v.driver}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={statusForBadge(v.status)} />
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {formatDate(v.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <ActionButton label="Editar" onClick={() => onEdit(v)} />
                    <ActionButton
                      label="Excluir"
                      variant="danger"
                      loading={deletingId === v.id}
                      onClick={() => onDelete(v.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ActionButton({
  label,
  onClick,
  variant = "default",
  loading,
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  loading?: boolean;
}) {
  const base =
    "rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-50";
  const colors =
    variant === "danger"
      ? "border border-rose-500/40 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
      : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`${base} ${colors}`}
    >
      {loading ? "..." : label}
    </button>
  );
}
