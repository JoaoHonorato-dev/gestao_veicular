import type { ChartPoint } from "@/lib/dashboard-data";

type ActivityChartProps = {
  data: ChartPoint[];
  loading?: boolean;
};

export function ActivityChart({ data, loading }: ActivityChartProps) {
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.online, d.offline]),
    1,
  );

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
          Atividade semanal
        </h2>
        <p className="text-sm text-neutral-500">
          Veículos online vs offline por dia
        </p>
        <div className="mt-3 flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" />
            Online
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
            Offline
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-end justify-between gap-2 px-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-full animate-pulse rounded-t-md bg-neutral-100 dark:bg-neutral-800"
              style={{ height: `${40 + (i % 3) * 20}%` }}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-48 items-end justify-between gap-2 sm:gap-3">
          {data.map((point) => (
            <div
              key={point.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-40 w-full items-end justify-center gap-1">
                <div
                  className="w-3 rounded-t-md bg-sky-500 sm:w-4"
                  style={{ height: `${(point.online / maxValue) * 100}%` }}
                  title={`Online: ${point.online}`}
                />
                <div
                  className="w-3 rounded-t-md bg-neutral-300 dark:bg-neutral-600 sm:w-4"
                  style={{ height: `${(point.offline / maxValue) * 100}%` }}
                  title={`Offline: ${point.offline}`}
                />
              </div>
              <span className="text-xs font-medium text-neutral-500">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
