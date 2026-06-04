/**
 * Tipos usados no CRUD de veículos (frontend + API).
 * Separados do Prisma para você controlar o que trafega na rede.
 */

/** Valores aceitos no campo status */
export type VehicleStatusValue = "ONLINE" | "OFFLINE";

/** Dados do formulário (criar e editar usam a mesma estrutura) */
export type VehicleFormData = {
  plate: string;
  model: string;
  driver: string;
  status: VehicleStatusValue;
};

/** Resposta padrão das rotas /api/vehicles */
export type VehicleApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
};

/** Veículo serializado para a tabela (createdAt vira string ISO na API) */
export type VehicleListItem = {
  id: number;
  plate: string;
  model: string;
  driver: string;
  status: VehicleStatusValue;
  createdAt: string;
};

/** Payload para criar no banco (após validação) */
export type CreateVehicleInput = VehicleFormData;

/** Payload para atualizar — todos os campos opcionais exceto o que você enviar */
export type UpdateVehicleInput = Partial<VehicleFormData>;
