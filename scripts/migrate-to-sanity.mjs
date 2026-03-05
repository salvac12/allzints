/**
 * Migration script: Import products from JSON + local images to Sanity
 *
 * Usage:
 *   1. Make sure you have a Sanity project created and SANITY_PROJECT_ID set
 *   2. Run: npx sanity login  (in the project root)
 *   3. Run: node scripts/migrate-to-sanity.mjs
 *
 * Requirements:
 *   - SANITY_PROJECT_ID env var or hardcoded below
 *   - Sanity auth token (via `npx sanity login`)
 */

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream } from "fs";
import { basename, join } from "path";

// ── Config ──────────────────────────────────────────────────────────
const PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const DATASET = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_TOKEN || ""; // Set via env or `npx sanity login`

if (!PROJECT_ID) {
  console.error("Error: Set SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) before running this script.");
  process.exit(1);
}

if (!TOKEN) {
  console.error("Error: Set SANITY_TOKEN env var. You can create one at https://www.sanity.io/manage");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── Paths ───────────────────────────────────────────────────────────
const PRODUCTS_JSON = join(process.cwd(), "src/data/productos.json");
const IMAGES_DIR = join(process.cwd(), "public/images/productos");

// ── Helpers ─────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadImage(filePath) {
  const fileName = basename(filePath);
  try {
    const stream = createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename: fileName,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn(`  Warning: Could not upload image ${fileName}:`, err.message);
    return null;
  }
}

// ── Main ────────────────────────────────────────────────────────────
async function migrate() {
  console.log("Reading products from JSON...");
  const products = JSON.parse(readFileSync(PRODUCTS_JSON, "utf-8"));
  console.log(`Found ${products.length} products to migrate.\n`);

  let success = 0;
  let skipped = 0;

  for (const p of products) {
    const slug = slugify(p.nombre);

    // Check if product already exists (by oldId)
    const existing = await client.fetch(
      `*[_type == "product" && oldId == $oldId][0]._id`,
      { oldId: p.id }
    );

    if (existing) {
      console.log(`  Skipping "${p.nombre}" (already exists as ${existing})`);
      skipped++;
      continue;
    }

    console.log(`Migrating: ${p.nombre}...`);

    // Upload image
    const imagePath = join(IMAGES_DIR, p.imagen);
    const imageAsset = await uploadImage(imagePath);

    // Create document
    const doc = {
      _type: "product",
      nombre: p.nombre,
      slug: {
        _type: "slug",
        current: slug,
      },
      precio: p.precio,
      categoria: p.categoria,
      descripcion: p.descripcion,
      materiales: p.materiales || [],
      dimensiones: p.dimensiones || "",
      stock: 10, // Default stock
      visible: true,
      destacado: false,
      oldId: p.id,
    };

    if (imageAsset) {
      doc.imagen = imageAsset;
    }

    try {
      const created = await client.create(doc);
      console.log(`  Created: ${created._id} (slug: ${slug})`);
      success++;
    } catch (err) {
      console.error(`  Error creating "${p.nombre}":`, err.message);
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`  Created: ${success}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total:   ${products.length}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
