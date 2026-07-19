import type { Product, LegacyProduct } from "@/types/product";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function legacyToProduct(p: LegacyProduct): Product {
  return {
    _id: p.id,
    nombre: p.nombre,
    slug: slugify(p.nombre),
    precio: p.precio,
    categoria: p.categoria,
    imagen: { _type: "image", asset: { _ref: "", _type: "reference" } },
    imagenUrl: `/images/productos/${p.imagen}`,
    descripcion: p.descripcion,
    materiales: p.materiales,
    dimensiones: p.dimensiones,
    stock: 10,
    oldId: p.id,
  };
}

export const categoryLabels: Record<string, string> = {
  bolsos: "Bolsos",
  etnicas: "Zintas Étnicas",
  tapiceria: "Zintas Tapicería",
  "mini-etnicas": "Mini Zintas Étnicas",
  "mini-gobelino": "Mini Zintas Gobelino",
  llaveros: "Llaveros",
  otros: "Otros",
};

// "Zintas" agrupa las dos familias de cintas de móvil.
export const zintasCategorias = ["etnicas", "tapiceria"] as const;
