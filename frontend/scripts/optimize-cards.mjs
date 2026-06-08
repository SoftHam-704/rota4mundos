import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join, dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cardsDir = resolve(__dirname, "..", "public", "cards");

const targets = [
  "card_brasil.jpg",
  "card_paraguay.jpg",
  "card_argentina.jpg",
  "card_chile.jpg",
];

const MAX_WIDTH = 720;
const QUALITY = 82;

function kb(bytes) {
  return (bytes / 1024).toFixed(1);
}

async function main() {
  console.log(`Convertendo ${targets.length} cards de pais para WebP (max ${MAX_WIDTH}px, q${QUALITY})\n`);

  for (const filename of targets) {
    const input = join(cardsDir, filename);
    const output = join(cardsDir, basename(filename, extname(filename)) + ".webp");

    try {
      const before = (await stat(input)).size;

      await sharp(input)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(output);

      const after = (await stat(output)).size;
      const reduction = (((before - after) / before) * 100).toFixed(0);

      console.log(`✓ ${filename}`);
      console.log(`  ${kb(before)} KB → ${kb(after)} KB (-${reduction}%)`);
      console.log(`  → ${basename(output)}\n`);
    } catch (err) {
      console.error(`✗ ${filename}: ${err.message}\n`);
    }
  }
}

main();
