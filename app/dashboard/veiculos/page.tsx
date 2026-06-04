"use client";

/**
 * Página do CRUD de veículos.
 * Protegida pelo mesmo guard de login das outras rotas do dashboard.
 */

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageLoader } from "@/components/ui/page-loader";
import { VehicleManager } from "@/components/vehicles/vehicle-manager";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function VeiculosPage() {
  const { user, loading } = useAuthGuard();

  if (loading || !user) {
    return <PageLoader label="Verificando sessão..." />;
  }

  return (
    <DashboardShell user={user}>
      <div className="mx-auto max-w-5xl">
        <VehicleManager />
      </div>
    </DashboardShell>
  );
}
