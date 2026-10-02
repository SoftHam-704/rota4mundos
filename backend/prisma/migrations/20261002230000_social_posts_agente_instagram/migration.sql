-- Agente do Instagram: tipo do post, origem (anti-repetição), revisão, erro e ids da Meta.
-- Só aditivo. social_posts foi criada por db push (fora do histórico); conferido com migrate diff.
-- CreateEnum
CREATE TYPE "SocialPostKind" AS ENUM ('REPORTAGEM', 'CIDADE', 'INFOGRAFICO', 'PODCAST');

-- AlterEnum


ALTER TYPE "SocialPostStatus" ADD VALUE 'PUBLISHING';
ALTER TYPE "SocialPostStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "social_posts" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "containerId" TEXT,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "kind" "SocialPostKind",
ADD COLUMN     "permalink" TEXT,
ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "sourceKey" TEXT;

-- CreateIndex
CREATE INDEX "social_posts_status_scheduledFor_idx" ON "social_posts"("status", "scheduledFor");

-- CreateIndex
CREATE UNIQUE INDEX "social_posts_platform_sourceKey_key" ON "social_posts"("platform", "sourceKey");

