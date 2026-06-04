import type { Vehicle } from "@prisma/client";
import type { VehicleListItem } from "@/types/vehicle";

/** Converte registro do Prisma para JSON amigável à UI (datas como string) */
export function serializeVehicle(vehicle: Vehicle): VehicleListItem {
  return {
    id: vehicle.id,
    plate: vehicle.plate,
    model: vehicle.model,
    driver: vehicle.driver,
    status: vehicle.status,
    createdAt: vehicle.createdAt.toISOString(),
  };
}
