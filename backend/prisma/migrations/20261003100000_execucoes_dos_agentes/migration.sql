-- Registro das rodadas dos agentes para a rota de saúde (Guardião). Só aditivo.
-- CreateEnum
CREATE TYPE "ResultadoRodada" AS ENUM ('EXECUTANDO', 'OK', 'NADA_A_FAZER', 'FALHOU');

-- CreateTable
CREATE TABLE "agent_runs" (
    "id" TEXT NOT NULL,
    "agente" TEXT NOT NULL,
    "iniciadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "terminadoEm" TIMESTAMP(3),
    "resultado" "ResultadoRodada" NOT NULL DEFAULT 'EXECUTANDO',
    "detalhe" TEXT,
    "erro" TEXT,

    CONSTRAINT "agent_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "agent_runs_agente_iniciadoEm_idx" ON "agent_runs"("agente", "iniciadoEm");

