"use client";

/**
 * Orquestrador do CRUD — concentra estado e chamadas à API.
 *
 * Fluxo:
 * 1. loadVehicles() ao montar
 * 2. "Novo" → exibe VehicleForm (create)
 * 3. "Editar" → exibe VehicleForm (edit) com dados da linha
 * 4. Submit → POST ou PUT
 * 5. Excluir → DELETE com confirmação
 */

import { useCallback, useEffect, useState } from "react";

import { AlertMessage } from "@/components/ui/alert-message";
import { VehicleCrudTable } from "@/components/vehicles/vehicle-crud-table";
import { VehicleForm } from "@/components/vehicles/vehicle-form";
import type {
  VehicleApiResponse,
  VehicleFormData,
  VehicleListItem,
} from "@/types/vehicle";

type FormMode = "closed" | "create" | "edit";

export function VehicleManager() {
  const [vehicles, setVehicles] = useState<VehicleListItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [formMode, setFormMode] = useState<FormMode>("closed");
  const [editingVehicle, setEditingVehicle] = useState<VehicleListItem | null>(
    null,
  );
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");

  /** Busca lista na API */
  const loadVehicles = useCallback(async () => {
    setListLoading(true);
    setPageError("");

    try {
      const res = await fetch("/api/vehicles");
      const json: VehicleApiResponse<VehicleListItem[]> = await res.json();

      if (!json.success || !json.data) {
        setPageError(json.message || "Erro ao carregar veículos.");
        setVehicles([]);
        return;
      }

      setVehicles(json.data);
    } catch {
      setPageError("Falha de rede ao carregar veículos.");
      setVehicles([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const closeForm = () => {
    setFormMode("closed");
    setEditingVehicle(null);
  };

  const openCreate = () => {
    setPageSuccess("");
    setPageError("");
    setEditingVehicle(null);
    setFormMode("create");
  };

  const openEdit = (vehicle: VehicleListItem) => {
    setPageSuccess("");
    setPageError("");
    setEditingVehicle(vehicle);
    setFormMode("edit");
  };

  /** Cria ou atualiza conforme o modo do formulário */
  const handleSubmit = async (data: VehicleFormData) => {
    setFormLoading(true);
    setPageError("");
    setPageSuccess("");

    const isEdit = formMode === "edit" && editingVehicle;
    const url = isEdit
      ? `/api/vehicles/${editingVehicle.id}`
      : "/api/vehicles";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: VehicleApiResponse<VehicleListItem> = await res.json();

      if (!json.success) {
        // Repassa erros de campo para o formulário via exceção com mensagem
        const detail = json.errors
          ? Object.values(json.errors).join(" ")
          : json.message;
        throw new Error(detail);
      }

      setPageSuccess(json.message);
      closeForm();
      await loadVehicles();
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id);
    const confirmed = window.confirm(
      `Excluir o veículo ${vehicle?.plate ?? id}? Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    setPageError("");
    setPageSuccess("");

    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
      const json: VehicleApiResponse = await res.json();

      if (!json.success) {
        setPageError(json.message);
        return;
      }

      setPageSuccess(json.message);
      if (editingVehicle?.id === id) closeForm();
      await loadVehicles();
    } catch {
      setPageError("Falha de rede ao excluir veículo.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            Cadastro de veículos
          </h2>
          <p className="text-sm text-neutral-500">
            CRUD completo — dados salvos no PostgreSQL via Prisma
          </p>
        </div>
        {formMode === "closed" && (
          <button
            type="button"
            onClick={openCreate}
            className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            + Novo veículo
          </button>
        )}
      </div>

      {pageError && <AlertMessage type="error" message={pageError} />}
      {pageSuccess && <AlertMessage type="success" message={pageSuccess} />}

      {formMode !== "closed" && (
        <VehicleForm
          /* key força o React a remontar o form ao trocar de veículo */
          key={editingVehicle?.id ?? "novo"}
          mode={formMode === "create" ? "create" : "edit"}
          initialValues={
            editingVehicle
              ? {
                  plate: editingVehicle.plate,
                  model: editingVehicle.model,
                  driver: editingVehicle.driver,
                  status: editingVehicle.status,
                }
              : undefined
          }
          loading={formLoading}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="mb-4 text-base font-semibold text-neutral-900 dark:text-neutral-50">
          Frota cadastrada
        </h3>
        <VehicleCrudTable
          vehicles={vehicles}
          loading={listLoading}
          deletingId={deletingId}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
