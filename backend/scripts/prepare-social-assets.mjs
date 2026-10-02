// Copia do frontend as imagens que o gerador de artes do Instagram usa, já no tamanho
// final, para backend/assets/social/. A API roda na SaveInCloud sem a pasta do site,
// então as artes não podem depender de frontend/public em tempo de execução.
//
// Uso (a partir de backend/): node scripts/prepare-social-assets.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const PUB = path.join(ROOT, "frontend", "public");
const OUT = path.join(ROOT, "backend", "assets", "social");

fs.mkdirSync(path.join(OUT, "cities"), { recursive: true });
fs.mkdirSync(path.join(OUT, "infograficos"), { recursive: true });

// Fotos de cidade: recorte 4:5 no tamanho do post (1080x1350)
for (const f of fs.readdirSync(path.join(PUB, "cities"))) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const dst = path.join(OUT, "cities", f.replace(/\.\w+$/, ".jpg"));
    await sharp(path.join(PUB, "cities", f))
        .resize(1080, 1350, { fit: "cover", position: "attention" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(dst);
}

// Infográficos (PT): 1080 de largura, proporção original
for (const f of fs.readdirSync(path.join(PUB, "infograficos", "ptg"))) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    await sharp(path.join(PUB, "infograficos", "ptg", f))
        .resize({ width: 1080 })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(path.join(OUT, "infograficos", f.replace(/\.\w+$/, ".jpg")));
}

// Ícone do logo (faixas das 4 bandeiras), com transparência
await sharp(path.join(PUB, "logo-icon.png")).resize(200).png().toFile(path.join(OUT, "logo-icon.png"));

// Fundo padrão das reportagens: a ponte ao amanhecer (ilustração gerada por IA, 1024x1024 —
// a hero-ponte.png do site tem só 1101x558 e borra quando ampliada para 4:5). As artes que usam
// esta imagem levam o selo "Imagem ilustrativa": a ponte real ainda está em obra.
await sharp(path.join(ROOT, "rota_bioceanica_bridge_dawn_1777639267186.png"))
    .resize(1080, 1350, { fit: "cover", position: "centre" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(OUT, "ponte.jpg"));

const total = (dir) => fs.readdirSync(dir, { recursive: true }).filter((f) => /\.(jpg|png)$/.test(f)).length;
console.log(`assets/social: ${total(OUT)} arquivos`);
