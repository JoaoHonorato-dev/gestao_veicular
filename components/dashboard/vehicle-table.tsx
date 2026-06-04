import { StatusBadge } from "@/components/ui/status-badge";
import type { TrackedVehicle } from "@/lib/dashboard-data";

type VehicleTableProps = {
  vehicles: TrackedVehicle[];
  loading?: boolean;
};

function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-12 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"
        />
      ))}
    </div>
  );
}

export function VehicleTable({ vehicles, loading }: VehicleTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
          Veículos rastreados
        </h2>
        <p className="text-sm text-neutral-500">
          Status e última posição conhecida
        </p>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50">
                <th className="px-5 py-3 font-medium">Placa</th>
                <th className="px-5 py-3 font-medium">Veículo</th>
                <th className="px-5 py-3 font-medium">Motorista</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Velocidade</th>
                <th className="px-5 py-3 font-medium">Localização</th>
                <th className="px-5 py-3 font-medium">Atualização</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="transition hover:bg-neutral-50/80 dark:hover:bg-neutral-900/40"
                >
                  <td className="px-5 py-3.5 font-mono font-medium text-neutral-900 dark:text-neutral-50">
                    {vehicle.plate}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-700 dark:text-neutral-300">
                    {vehicle.model}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                    {vehicle.driver}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={vehicle.status} />
                  </td>
                  <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                    {vehicle.speed > 0 ? `${vehicle.speed} km/h` : "—"}
                  </td>
                  <td className="max-w-[180px] truncate px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                    {vehicle.location}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-500">{vehicle.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
