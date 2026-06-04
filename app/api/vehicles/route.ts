import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { serializeVehicle } from "@/lib/vehicle-serializer";
import { validateVehicleForm } from "@/lib/vehicle-validation";
import {
  createVehicle,
  findVehicleByPlate,
  listVehicles,
} from "@/services/vehicle.service";

/**
 * GET /api/vehicles — lista todos os veículos
 * POST /api/vehicles — cria um novo veículo
 */

export async function GET() {
  try {
    const vehicles = await listVehicles();
    return NextResponse.json({
      success: true,
      message: "Lista carregada.",
      data: vehicles.map(serializeVehicle),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar veículos. Verifique a conexão com o PostgreSQL.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const duplicate = await findVehicleByPlate(validation.data.plate);
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

    const created = await createVehicle(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Veículo criado com sucesso.",
        data: serializeVehicle(created),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, message: "Erro no banco de dados." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Erro ao criar veículo." },
      { status: 500 },
    );
  }
}
