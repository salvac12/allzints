/**
 * Actualiza en Sanity (dataset production):
 *   1. Bolsos: precio 25 €, descripción gobelino, materiales, dimensiones 20x30 cm.
 *   2. Cintas volteadas: re-sube la imagen local (ya espejada, mosquetón a la dcha)
 *      y la asigna como imagen principal del producto correspondiente.
 *
 * Uso:
 *   SANITY_TOKEN=<token con permisos de escritura> node scripts/update-bolsos-y-fotos-sanity.mjs
 *   (token en https://www.sanity.io/manage → proyecto xap3nn51 → API → Tokens, rol Editor)
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "xap3nn51";
const DATASET = process.env.SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_TOKEN || "";

if (!TOKEN) {
  console.error("Error: falta SANITY_TOKEN (crear en https://www.sanity.io/manage).");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const IMAGES_DIR = join(process.cwd(), "public/images/productos");

const BOLSO_DESC =
  "Bolso tipo cartera confeccionado en tela de gobelino, con entretela para darle más cuerpo y un interior forrado de tela de toldo, fácil de limpiar. Incluye dos presillas para colgar una cadena y botón de metal bronce para un toque elegante.";

// Ficheros locales ya volteados (mosquetón a la derecha)
const FLIPPED_IMAGES = [
  "Cinta-Amberes.webp", "Cinta-Barcelona_.webp", "Cinta-Bogota.webp",
  "Cinta-Budapest-Blanco.webp", "Cinta-Budapest-Verde.webp", "Cinta-Dublin-V.webp",
  "Cinta-Escocia-Rojo.webp", "Cinta-Escocia-Verde.webp", "Cinta-Estambul.webp",
  "Cinta-Etnica-Azulon.webp", "Cinta-Etnica-Manzana.webp", "Cinta-Formentera.webp",
  "Cinta-Ibiza-Azul.webp", "Cinta-Ibiza-Rosa.webp", "Cinta-Kenia-Blanco.webp",
  "Cinta-Kenia-Negro.webp", "Cinta-Londres.webp", "Cinta-Madrid.webp",
  "Cinta-Mallorca.webp", "Cinta-Menorca.webp", "Cinta-Varsovia.webp",
  "Cinta-Viena.webp", "Cinta-Zigzag-Marino.webp", "Cinta-Zigzag-Negro.webp",
  "Cinta-Zigzag-Teja.webp", "Cinta-Zigzag-verde-beige.webp",
];

async function updateBolsos() {
  const bolsos = await client.fetch(`*[_type == "product" && categoria == "bolsos"]{_id, nombre, precio}`);
  console.log(`Bolsos en Sanity: ${bolsos.length}`);
  for (const b of bolsos) {
    await client
      .patch(b._id)
      .set({
        precio: 25,
        descripcion: BOLSO_DESC,
        materiales: ["Tela de gobelino", "Forro de tela de toldo"],
        dimensiones: "20x30 cm",
      })
      .commit();
    console.log(`  ✔ ${b.nombre}: precio ${b.precio} → 25, descripción actualizada`);
  }
}

async function updateFlippedImages() {
  // Los productos migrados guardan el nombre del fichero original en la ruta del asset
  const products = await client.fetch(
    `*[_type == "product" && defined(imagen.asset)]{_id, nombre, "filename": imagen.asset->originalFilename}`
  );
  const byFilename = new Map(products.map((p) => [p.filename, p]));
  for (const file of FLIPPED_IMAGES) {
    const p = byFilename.get(file);
    if (!p) {
      console.warn(`  ⚠ Sin producto en Sanity para ${file} — omitido`);
      continue;
    }
    const local = join(IMAGES_DIR, file);
    if (!existsSync(local)) {
      console.warn(`  ⚠ No existe fichero local ${file} — omitido`);
      continue;
    }
    const asset = await client.assets.upload("image", createReadStream(local), { filename: file });
    await client
      .patch(p._id)
      .set({ imagen: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
    console.log(`  ✔ ${p.nombre}: imagen volteada subida (${file})`);
  }
}

console.log("— Actualizando bolsos…");
await updateBolsos();
console.log("— Subiendo imágenes volteadas…");
await updateFlippedImages();
console.log("Hecho.");
