-- Migração: ajusta tabela Vehicle para o CRUD (placa, modelo, motorista, status, createdAt)

-- Enum de status
CREATE TYPE "VehicleStatus" AS ENUM ('ONLINE', 'OFFLINE');

-- Remove colunas antigas que não fazem parte do novo modelo
ALTER TABLE "Vehicle" DROP COLUMN IF EXISTS "brand";
ALTER TABLE "Vehicle" DROP COLUMN IF EXISTS "year";
ALTER TABLE "Vehicle" DROP COLUMN IF EXISTS "odometer";
ALTER TABLE "Vehicle" DROP COLUMN IF EXISTS "notes";
ALTER TABLE "Vehicle" DROP COLUMN IF EXISTS "updatedAt";

-- Novas colunas
ALTER TABLE "Vehicle" ADD COLUMN IF NOT EXISTS "driver" TEXT NOT NULL DEFAULT 'Não informado';
ALTER TABLE "Vehicle" ADD COLUMN IF NOT EXISTS "status" "VehicleStatus" NOT NULL DEFAULT 'OFFLINE';

-- Remove default temporário do driver após migração
ALTER TABLE "Vehicle" ALTER COLUMN "driver" DROP DEFAULT;
