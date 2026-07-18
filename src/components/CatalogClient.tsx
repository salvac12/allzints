"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface CatalogClientProps {
  products: Product[];
}

const filters = [
  { label: "Todos", value: "todos" },
  { label: "Zintas", value: "zintas" },
  { label: "Bolsos", value: "bolsos" },
  { label: "Otros", value: "otros" },
];

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
    if (activeFilter === "zintas" || activeFilter === "otros") return [];
    return products.filter((p) => p.categoria === activeFilter);
  }, [activeFilter, products]);

  const showZintasIntro =
    activeFilter === "zintas" ||
    activeFilter === "etnicas" ||
    activeFilter === "tapiceria";

  // El pill "Zintas" queda activo también dentro de sus subcategorías
  const isPillActive = (value: string) =>
    value === "zintas"
      ? showZintasIntro
      : activeFilter === value;

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              isPillActive(f.value)
                ? "bg-terracotta text-white shadow-sm"
                : "bg-white text-texto border border-border hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {f.label}
            {activeFilter === f.value &&
              f.value !== "otros" &&
              f.value !== "zintas" && (
                <span className="ml-1.5 text-white/80">
                  ({filtered.length})
                </span>
              )}
          </button>
        ))}
      </div>

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

      {/* Otros: categoría en construcción */}
      {activeFilter === "otros" ? (
        <div className="max-w-xl mx-auto text-center py-16">
          <div className="w-14 h-14 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-terracotta"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
          <h2 className="font-heading text-2xl text-texto mb-3">Otros</h2>
          <p className="text-mid leading-relaxed">
            Por ahora esta categoría está en construcción. Pronto iremos
            añadiendo novedades y productos interesantes.
          </p>
        </div>
      ) : activeFilter === "zintas" ? null : (
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
