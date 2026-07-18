"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface CatalogClientProps {
  products: Product[];
}

export default function CatalogClient({ products }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("categoria") || "todos";
  const [activeFilter, setActiveFilter] = useState(urlCategory);

  // Sync filter when the URL category changes (e.g. navbar links while already on /productos)
  useEffect(() => {
    setActiveFilter(urlCategory);
  }, [urlCategory]);

  const filtered = useMemo(() => {
    if (activeFilter === "todos") return products;
    // "Zintas" muestra solo las dos subcategorías, sin grid mezclado
    if (activeFilter === "zintas") return [];
    return products.filter((p) => p.categoria === activeFilter);
  }, [activeFilter, products]);

  const showZintasIntro =
    activeFilter === "zintas" ||
    activeFilter === "etnicas" ||
    activeFilter === "tapiceria";

  return (
    <>
      {/* Intro descriptivo de las Zintas */}
      {showZintasIntro && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed">
            Lleva contigo un toque artesanal con nuestras Zintas de móvil,
            confeccionadas a mano con telas de alta calidad. Ideales para
            personalizar tus accesorios, estas Zintas aportan un estilo único y
            bohemio a cualquier look. Descubre nuestros modelos en tejidos
            étnicos y de tapicería. ¡Encuentra la que mejor se adapte a tu
            estilo!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <button
              onClick={() => setActiveFilter("etnicas")}
              className={`relative aspect-[4/3] rounded-card overflow-hidden shadow-sm transition-all ${
                activeFilter === "etnicas"
                  ? "ring-2 ring-terracotta"
                  : "hover:ring-2 hover:ring-terracotta/50"
              }`}
            >
              <Image
                src="/images/productos/Cinta-Etnica-Fucsia.webp"
                alt="Cintas étnicas"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-cream/90 text-texto text-sm px-4 py-1 rounded-full font-medium">
                Étnicas
              </span>
            </button>
            <button
              onClick={() => setActiveFilter("tapiceria")}
              className={`relative aspect-[4/3] rounded-card overflow-hidden shadow-sm transition-all ${
                activeFilter === "tapiceria"
                  ? "ring-2 ring-terracotta"
                  : "hover:ring-2 hover:ring-terracotta/50"
              }`}
            >
              <Image
                src="/images/productos/Cinta-Kenia-Blanco.webp"
                alt="Cintas de tapicería"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-cream/90 text-texto text-sm px-4 py-1 rounded-full font-medium">
                Tapicería
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Bolsos: texto descriptivo */}
      {activeFilter === "bolsos" && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed">
            Estos bolsos tipo cartera están confeccionados en tela de gobelino,
            con entretela para darles más cuerpo y un interior forrado de tela
            de toldo, fácil de limpiar. Incluyen dos presillas para colgar una
            cadena y botón de metal bronce para un toque elegante. Medidas:
            20x30 cm.
          </p>
        </div>
      )}

      {/* Grid de productos (Zintas solo muestra los dos tiles de arriba) */}
      {activeFilter !== "zintas" && (
        <>
          <ProductGrid products={filtered} />
          {filtered.length === 0 && (
            <p className="text-center text-mid py-12">
              No se encontraron productos en esta categoría.
            </p>
          )}
        </>
      )}
    </>
  );
}
