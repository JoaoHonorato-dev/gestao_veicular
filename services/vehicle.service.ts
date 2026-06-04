import type { Vehicle } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { CreateVehicleInput, UpdateVehicleInput } from "@/types/vehicle";

/**
 * Camada de serviço — único lugar que fala com o Prisma para veículos.
 * As rotas API chamam estas funções; a página não acessa o banco diretamente.
 */

export async function listVehicles(): Promise<Vehicle[]> {
  return prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getVehicleById(id: number): Promise<Vehicle | null> {
  return prisma.vehicle.findUnique({ where: { id } });
}

export async function createVehicle(data: CreateVehicleInput): Promise<Vehicle> {
  return prisma.vehicle.create({ data });
}

export async function updateVehicle(
  id: number,
  data: UpdateVehicleInput,
): Promise<Vehicle> {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
}

export async function deleteVehicle(id: number): Promise<void> {
  await prisma.vehicle.delete({ where: { id } });
}

/** Placa já cadastrada? (útil na criação e ao trocar placa na edição) */
export async function findVehicleByPlate(
  plate: string,
  excludeId?: number,
): Promise<Vehicle | null> {
  return prisma.vehicle.findFirst({
    where: {
      plate,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
  });
}
