import type { Metadata } from "next";
import { Suspense } from "react";
import type { Product, LegacyProduct } from "@/types/product";
import { client, isSanityConfigured } from "@/sanity/client";
import { allProductsQuery } from "@/sanity/queries";
import CatalogClient from "@/components/CatalogClient";
import { legacyToProduct } from "@/lib/catalog";
import productosData from "@/data/productos.json";

export const metadata: Metadata = {
  title: "Nuestra Colección",
  description:
    "Explora nuestra colección de bolsos artesanales, zintas étnicas y zintas de tapicería. Accesorios hechos a mano con telas seleccionadas.",
};

export default async function ProductosPage() {
  let productos: Product[];
  if (isSanityConfigured) {
    productos = await client.fetch(allProductsQuery);
  } else {
    productos = (productosData as LegacyProduct[]).map(legacyToProduct);
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-texto">
            Nuestra Colección
          </h1>
          <p className="mt-3 text-mid">
            {productos.length} productos artesanales
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-12 text-mid">
              Cargando productos...
            </div>
          }
        >
          <CatalogClient products={productos} />
        </Suspense>
      </div>
    </div>
  );
}
