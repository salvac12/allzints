/**
 * Segunda tanda de cambios en Sanity (dataset production):
 *   1. Cintas étnicas: precio → 15 €.
 *   2. Ocultar "Bolso beige y negro Lino" (visible:false).
 *   3. Re-subir TODAS las fotos de producto normalizadas (cuadradas, cinta a la
 *      derecha) desde public/images/productos, mapeando por originalFilename.
 *
 * Uso:
 *   SANITY_TOKEN=<token Editor> node scripts/update-sanity-cambios2.mjs
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "xap3nn51";
const DATASET = process.env.SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_TOKEN || "";

if (!TOKEN) {
  console.error("Error: falta SANITY_TOKEN (permiso Editor).");
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

async function setEtnicasPrice() {
  const items = await client.fetch(
    `*[_type == "product" && categoria == "etnicas"]{_id, nombre, precio}`
  );
  let ok = 0;
  for (const p of items) {
    try {
      await client.patch(p._id).set({ precio: 15 }).commit();
      ok++;
      console.log(`  ✔ ${p.nombre}: precio ${p.precio} → 15`);
    } catch (e) {
      console.error(`  ✖ ${p.nombre}: ${e.message}`);
    }
  }
  console.log(`Étnicas a 15 €: ${ok}/${items.length}`);
}

async function hideLinoBag() {
  const items = await client.fetch(
    `*[_type == "product" && nombre match "*Lino*"]{_id, nombre}`
  );
  for (const p of items) {
    try {
      await client.patch(p._id).set({ visible: false }).commit();
      console.log(`  ✔ Ocultado: ${p.nombre}`);
    } catch (e) {
      console.error(`  ✖ ${p.nombre}: ${e.message}`);
    }
  }
  if (!items.length) console.log("  (sin bolso Lino en Sanity)");
}

async function reuploadImages() {
  const products = await client.fetch(
    `*[_type == "product" && defined(imagen.asset)]{_id, nombre, "filename": imagen.asset->originalFilename}`
  );
  let ok = 0,
    skip = 0;
  for (const p of products) {
    const local = p.filename ? join(IMAGES_DIR, p.filename) : null;
    if (!local || !existsSync(local)) {
      skip++;
      console.warn(`  ⚠ Sin fichero local para ${p.nombre} (${p.filename}) — omitido`);
      continue;
    }
    try {
      const asset = await client.assets.upload("image", createReadStream(local), {
        filename: p.filename,
      });
      await client
        .patch(p._id)
        .set({ imagen: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
        .commit();
      ok++;
      console.log(`  ✔ ${p.nombre}: imagen normalizada subida (${p.filename})`);
    } catch (e) {
      console.error(`  ✖ ${p.nombre} (${p.filename}): ${e.message}`);
    }
  }
  console.log(`Imágenes re-subidas: ${ok} (omitidas: ${skip})`);
}

console.log("— Precio cintas étnicas → 15 €…");
await setEtnicasPrice();
console.log("— Ocultando bolso Lino…");
await hideLinoBag();
console.log("— Re-subiendo fotos normalizadas (cuadradas)…");
await reuploadImages();
console.log("Hecho.");
