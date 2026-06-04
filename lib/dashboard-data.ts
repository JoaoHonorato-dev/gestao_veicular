export type VehicleStatus = "online" | "offline";

export type TrackedVehicle = {
  id: string;
  plate: string;
  model: string;
  driver: string;
  status: VehicleStatus;
  lastUpdate: string;
  speed: number;
  location: string;
};

export type DashboardMetrics = {
  total: number;
  online: number;
  offline: number;
  alerts: number;
};

export type ChartPoint = {
  label: string;
  online: number;
  offline: number;
};

export const MOCK_VEHICLES: TrackedVehicle[] = [
  {
    id: "1",
    plate: "ABC-1D23",
    model: "Fiat Strada",
    driver: "Carlos Silva",
    status: "online",
    lastUpdate: "há 2 min",
    speed: 48,
    location: "Av. Paulista, SP",
  },
  {
    id: "2",
    plate: "DEF-4G56",
    model: "VW Delivery",
    driver: "Ana Souza",
    status: "online",
    lastUpdate: "há 5 min",
    speed: 62,
    location: "Rod. Anhanguera, KM 42",
  },
  {
    id: "3",
    plate: "GHI-7J89",
    model: "Mercedes Sprinter",
    driver: "João Mendes",
    status: "offline",
    lastUpdate: "há 3 h",
    speed: 0,
    location: "Depósito Central",
  },
  {
    id: "4",
    plate: "JKL-0M12",
    model: "Renault Master",
    driver: "Maria Lima",
    status: "online",
    lastUpdate: "há 1 min",
    speed: 35,
    location: "Rua Oscar Freire, SP",
  },
  {
    id: "5",
    plate: "MNO-3P45",
    model: "Iveco Daily",
    driver: "Pedro Alves",
    status: "offline",
    lastUpdate: "há 1 d",
    speed: 0,
    location: "Oficina Norte",
  },
  {
    id: "6",
    plate: "QRS-6T78",
    model: "Ford Ranger",
    driver: "Lucia Rocha",
    status: "online",
    lastUpdate: "agora",
    speed: 72,
    location: "Marginal Tietê, SP",
  },
];

export const MOCK_CHART: ChartPoint[] = [
  { label: "Seg", online: 18, offline: 4 },
  { label: "Ter", online: 20, offline: 3 },
  { label: "Qua", online: 19, offline: 5 },
  { label: "Qui", online: 22, offline: 2 },
  { label: "Sex", online: 21, offline: 4 },
  { label: "Sáb", online: 14, offline: 8 },
  { label: "Dom", online: 10, offline: 12 },
];

export function computeMetrics(vehicles: TrackedVehicle[]): DashboardMetrics {
  const online = vehicles.filter((v) => v.status === "online").length;
  return {
    total: vehicles.length,
    online,
    offline: vehicles.length - online,
    alerts: vehicles.filter((v) => v.status === "offline").length + 1,
  };
}

export async function fetchDashboardData(): Promise<{
  vehicles: TrackedVehicle[];
  chart: ChartPoint[];
  metrics: DashboardMetrics;
}> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const vehicles = MOCK_VEHICLES;
  return {
    vehicles,
    chart: MOCK_CHART,
    metrics: computeMetrics(vehicles),
  };
}
