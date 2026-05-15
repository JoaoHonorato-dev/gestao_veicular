/**
 * Utilitários compartilhados (formatação, validações leves, helpers).
 * Evite colocar lógica de negócio aqui — use `services/`.
 */

export function formatPlate(plate: string): string {
  const cleaned = plate.replace(/\s+/g, "").toUpperCase();
  return cleaned;
}
