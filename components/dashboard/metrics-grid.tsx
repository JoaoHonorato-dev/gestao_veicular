import { MetricCard } from "@/components/ui/metric-card";
import type { DashboardMetrics } from "@/lib/dashboard-data";

type MetricsGridProps = {
  metrics: DashboardMetrics;
  loading?: boolean;
};

function SkeletonCard() {
  return (
    <div className="h-[120px] animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900" />
  );
}

export function MetricsGrid({ metrics, loading }: MetricsGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total de veículos"
        value={metrics.total}
        subtitle="Cadastrados na frota"
        accent="sky"
        icon={<span className="text-lg">🚗</span>}
      />
      <MetricCard
        title="Online"
        value={metrics.online}
        subtitle="Transmitindo sinal"
        accent="emerald"
        trend={`${Math.round((metrics.online / metrics.total) * 100)}% da frota`}
        icon={<span className="text-lg">📡</span>}
      />
      <MetricCard
        title="Offline"
        value={metrics.offline}
        subtitle="Sem comunicação"
        accent="amber"
        icon={<span className="text-lg">⏸</span>}
      />
      <MetricCard
        title="Alertas"
        value={metrics.alerts}
        subtitle="Requerem atenção"
        accent="rose"
        icon={<span className="text-lg">⚠</span>}
      />
    </div>
  );
}
