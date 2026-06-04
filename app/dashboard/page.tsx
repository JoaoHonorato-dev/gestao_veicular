"use client";

import { useEffect, useState } from "react";

import { ActivityChart } from "@/components/dashboard/activity-chart";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { VehicleTable } from "@/components/dashboard/vehicle-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageLoader } from "@/components/ui/page-loader";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import {
  fetchDashboardData,
  type ChartPoint,
  type DashboardMetrics,
  type TrackedVehicle,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthGuard();
  const [vehicles, setVehicles] = useState<TrackedVehicle[]>([]);
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function load() {
      setDataLoading(true);
      try {
        const data = await fetchDashboardData();
        if (!cancelled) {
          setVehicles(data.vehicles);
          setChart(data.chart);
          setMetrics(data.metrics);
        }
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading || !user) {
    return <PageLoader label="Verificando sessão..." />;
  }

  return (
    <DashboardShell user={user}>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm text-neutral-500">
            Bem-vindo, <span className="font-medium text-neutral-800 dark:text-neutral-200">{user.name}</span>
          </p>
        </div>

        <MetricsGrid metrics={metrics ?? { total: 0, online: 0, offline: 0, alerts: 0 }} loading={dataLoading} />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ActivityChart data={chart} loading={dataLoading} />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-white/50 p-6 dark:border-neutral-800 dark:bg-neutral-950/50">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Resumo rápido
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex justify-between">
                  <span>Frota ativa agora</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {dataLoading ? "—" : `${metrics?.online ?? 0} veículos`}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Sem sinal</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {dataLoading ? "—" : `${metrics?.offline ?? 0} veículos`}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Última sincronização</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {dataLoading ? "Carregando..." : "Agora"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <VehicleTable vehicles={vehicles} loading={dataLoading} />
      </div>
    </DashboardShell>
  );
}
