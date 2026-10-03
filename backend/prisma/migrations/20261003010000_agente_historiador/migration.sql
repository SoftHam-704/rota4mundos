-- Agente Historiador: tabela de pautas e tipo de post HISTORIA. Só aditivo.
-- CreateEnum
CREATE TYPE "PautaStatus" AS ENUM ('PRONTA', 'DESCARTADA');

-- AlterEnum
ALTER TYPE "SocialPostKind" ADD VALUE 'HISTORIA';

-- CreateTable
CREATE TABLE "pautas" (
    "id" TEXT NOT NULL,
    "cidadeSlug" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "achados" JSONB NOT NULL,
    "fontes" JSONB NOT NULL,
    "status" "PautaStatus" NOT NULL,
    "motivo" TEXT,
    "articleId" TEXT,
    "socialPostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pautas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pautas_cidadeSlug_tema_idx" ON "pautas"("cidadeSlug", "tema");

