/**
 * DTOs e tipos de domínio da aplicação (não confundir com tipos gerados pelo Prisma).
 */

export type CreateVehicleInput = {
  plate: string;
  brand: string;
  model: string;
  year: number;
  odometer?: number | null;
  notes?: string | null;
};

export type UpdateVehicleInput = Partial<
  Omit<CreateVehicleInput, "plate"> & { plate?: string }
>;
