import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { serializeVehicle } from "@/lib/vehicle-serializer";
import {
  parseVehicleId,
  validateVehicleForm,
} from "@/lib/vehicle-validation";
import {
  deleteVehicle,
  findVehicleByPlate,
  getVehicleById,
  updateVehicle,
} from "@/services/vehicle.service";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET    /api/vehicles/[id] — um veículo
 * PUT    /api/vehicles/[id] — atualiza
 * DELETE /api/vehicles/[id] — remove
 */

export async function GET(_request: Request, { params }: RouteParams) {
  const { id: idParam } = await params;
  const id = parseVehicleId(idParam);

  if (id === null) {
    return NextResponse.json(
      { success: false, message: "ID inválido." },
      { status: 400 },
    );
  }

  try {
    const vehicle = await getVehicleById(id);
    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Veículo não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Veículo encontrado.",
      data: serializeVehicle(vehicle),
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao buscar veículo." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id: idParam } = await params;
  const id = parseVehicleId(idParam);

  if (id === null) {
    return NextResponse.json(
      { success: false, message: "ID inválido." },
      { status: 400 },
    );
  }

  try {
    const existing = await getVehicleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Veículo não encontrado." },
        { status: 404 },
      );
    }

    const body = await request.json();
    const validation = validateVehicleForm(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos.",
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    const duplicate = await findVehicleByPlate(validation.data.plate, id);
    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Esta placa já está cadastrada.",
          errors: { plate: "Placa já em uso." },
        },
        { status: 409 },
      );
    }

    const updated = await updateVehicle(id, validation.data);

    return NextResponse.json({
      success: true,
      message: "Veículo atualizado com sucesso.",
      data: serializeVehicle(updated),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, message: "Erro no banco de dados." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar veículo." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id: idParam } = await params;
  const id = parseVehicleId(idParam);

  if (id === null) {
    return NextResponse.json(
      { success: false, message: "ID inválido." },
      { status: 400 },
    );
  }

  try {
    const existing = await getVehicleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Veículo não encontrado." },
        { status: 404 },
      );
    }

    await deleteVehicle(id);

    return NextResponse.json({
      success: true,
      message: "Veículo excluído com sucesso.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao excluir veículo." },
      { status: 500 },
    );
  }
}
