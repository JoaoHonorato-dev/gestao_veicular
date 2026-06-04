/**
 * Validações do CRUD de veículos.
 * Rodam no servidor (API) e no cliente (formulário) para feedback imediato.
 */

import type { VehicleFormData, VehicleStatusValue } from "@/types/vehicle";
import { formatPlate } from "@/lib/utils";

const STATUS_VALUES: VehicleStatusValue[] = ["ONLINE", "OFFLINE"];

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
  data?: VehicleFormData;
};

/** Normaliza placa: remove espaços e deixa maiúsculo */
function normalizePlate(plate: string): string {
  return formatPlate(plate.trim());
}

/**
 * Valida os campos do formulário.
 * Retorna `errors` com chave = nome do campo (plate, model, driver, status).
 */
export function validateVehicleForm(
  input: Partial<VehicleFormData>,
): ValidationResult {
  const errors: Record<string, string> = {};

  const plate = input.plate ? normalizePlate(input.plate) : "";
  const model = input.model?.trim() ?? "";
  const driver = input.driver?.trim() ?? "";
  const status = input.status;

  if (!plate) {
    errors.plate = "A placa é obrigatória.";
  } else if (plate.length < 7) {
    errors.plate = "Informe uma placa válida (mín. 7 caracteres).";
  }

  if (!model) {
    errors.model = "O modelo é obrigatório.";
  } else if (model.length < 2) {
    errors.model = "O modelo deve ter pelo menos 2 caracteres.";
  }

  if (!driver) {
    errors.driver = "O motorista é obrigatório.";
  } else if (driver.length < 2) {
    errors.driver = "O nome do motorista deve ter pelo menos 2 caracteres.";
  }

  if (!status || !STATUS_VALUES.includes(status)) {
    errors.status = "Selecione um status válido (Online ou Offline).";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: {
      plate,
      model,
      driver,
      status: status as VehicleStatusValue,
    },
  };
}

/** Converte id da URL para número; retorna null se inválido */
export function parseVehicleId(id: string): number | null {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}
