-- Reels do Instagram: vídeo do post e formato. Só aditivo (posts existentes ficam IMAGE).
ALTER TABLE "social_posts" ADD COLUMN "videoUrl" TEXT;
ALTER TABLE "social_posts" ADD COLUMN "mediaType" TEXT NOT NULL DEFAULT 'IMAGE';
