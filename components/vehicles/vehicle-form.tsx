"use client";

/**
 * Formulário reutilizável para CRIAR e EDITAR veículos.
 *
 * - mode="create" → botão "Cadastrar"
 * - mode="edit"   → botão "Salvar alterações" + recebe initialValues
 *
 * A validação roda aqui antes de chamar onSubmit (mesmas regras da API).
 */

import { useState } from "react";

import { AlertMessage } from "@/components/ui/alert-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { validateVehicleForm } from "@/lib/vehicle-validation";
import type { VehicleFormData, VehicleStatusValue } from "@/types/vehicle";

const emptyForm: VehicleFormData = {
  plate: "",
  model: "",
  driver: "",
  status: "OFFLINE",
};

type VehicleFormProps = {
  mode: "create" | "edit";
  initialValues?: VehicleFormData;
  loading?: boolean;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  onCancel: () => void;
};

export function VehicleForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const [form, setForm] = useState<VehicleFormData>(
    initialValues ?? emptyForm,
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const title = mode === "create" ? "Novo veículo" : "Editar veículo";

  const handleChange = (
    field: keyof VehicleFormData,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Limpa erro do campo quando o usuário digita
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validateVehicleForm(form);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    try {
      await onSubmit(validation.data!);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao salvar veículo.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        Preencha os campos abaixo. Campos com * são obrigatórios.
      </p>

      <div className="mt-5 space-y-4">
        {submitError && <AlertMessage type="error" message={submitError} />}

        <Field
          label="Placa *"
          id="plate"
          value={form.plate}
          error={fieldErrors.plate}
          onChange={(v) => handleChange("plate", v)}
          placeholder="ABC1D23"
        />

        <Field
          label="Modelo *"
          id="model"
          value={form.model}
          error={fieldErrors.model}
          onChange={(v) => handleChange("model", v)}
          placeholder="Fiat Strada"
        />

        <Field
          label="Motorista *"
          id="driver"
          value={form.driver}
          error={fieldErrors.driver}
          onChange={(v) => handleChange("driver", v)}
          placeholder="Nome do motorista"
        />

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Status *
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as VehicleStatusValue)
            }
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
          {fieldErrors.status && (
            <p className="mt-1 text-xs text-rose-600">{fieldErrors.status}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {loading && <LoadingSpinner size="sm" />}
          {mode === "create" ? "Cadastrar" : "Salvar alterações"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

/** Campo de texto com label e mensagem de erro */
function Field({
  label,
  id,
  value,
  error,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 dark:bg-neutral-900 dark:text-neutral-100 ${
          error
            ? "border-rose-500 focus:ring-rose-500"
            : "border-neutral-300 focus:border-sky-500 focus:ring-sky-500 dark:border-neutral-700"
        }`}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
