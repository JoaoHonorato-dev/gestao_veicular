import type { Vehicle } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { CreateVehicleInput, UpdateVehicleInput } from "@/types";

/**
 * Camada de serviço para operações de veículos.
 * Centraliza acesso ao Prisma e regras simples de persistência.
 */
export async function listVehicles(): Promise<Vehicle[]> {
  return prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  return prisma.vehicle.findUnique({ where: { id } });
}

export async function createVehicle(
  data: CreateVehicleInput,
): Promise<Vehicle> {
  return prisma.vehicle.create({
    data: {
      plate: data.plate,
      brand: data.brand,
      model: data.model,
      year: data.year,
      odometer: data.odometer,
      notes: data.notes,
    },
  });
}

export async function updateVehicle(
  id: string,
  data: UpdateVehicleInput,
): Promise<Vehicle> {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
}

export async function deleteVehicle(id: string): Promise<void> {
  await prisma.vehicle.delete({ where: { id } });
}
