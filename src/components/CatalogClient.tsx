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

  // Landings que solo muestran tiles de subcategoría (sin grid mezclado)
  const landingOnly = ["zintas", "mini", "otros"];

  const filtered = useMemo(() => {
    if (activeFilter === "todos") return products;
    if (landingOnly.includes(activeFilter)) return [];
    return products.filter((p) => p.categoria === activeFilter);
  }, [activeFilter, products]);

  const showZintasIntro =
    activeFilter === "zintas" ||
    activeFilter === "etnicas" ||
    activeFilter === "tapiceria";

  const showMiniIntro =
    activeFilter === "mini" ||
    activeFilter === "mini-etnicas" ||
    activeFilter === "mini-gobelino";

  // Categorías aún sin catálogo cargado (fotos/productos pendientes) → mensaje suave
  const enPreparacion: string[] = [];

  // "Mini Zintas": dos subcategorías (como Zintas). Rellenar `img` con la foto
  // cuando esté (p. ej. "/images/productos/Mini-Cinta-Etnica.webp").
  const miniTiles: { label: string; filter: string; img: string | null }[] = [
    {
      label: "Mini Zinta Étnicas",
      filter: "mini-etnicas",
      img: "/images/productos/mini-cinta-rombos-mostaza.webp",
    },
    {
      label: "Mini Zinta Gobelino",
      filter: "mini-gobelino",
      img: "/images/productos/mini-cinta-atenas.webp",
    },
  ];

  // "Otros": categorías en preparación (próximamente). Rellenar `img` al añadir foto.
  const otrosTiles: { label: string; img: string | null }[] = [
    { label: "Cinturones", img: "/images/productos/otros-cinturones.webp" },
    {
      label: "Correas de Perro",
      img: "/images/productos/otros-correas-perro.webp",
    },
    { label: "Abanicos", img: "/images/productos/otros-abanicos.webp" },
  ];

  return (
    <>
      {/* Intro descriptivo de las Zintas */}
      {showZintasIntro && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed text-base md:text-lg text-balance">
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
                alt="Zintas étnicas"
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
                alt="Zintas de tapicería"
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

      {/* Intro Mini Zintas: dos subcategorías (Étnicas / Gobelino) */}
      {showMiniIntro && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed text-base md:text-lg text-balance">
            Nuestras Mini Zintas: la versión más compacta de nuestras Zintas,
            hechas a mano con las mismas telas. El complemento perfecto para dar
            un toque artesanal a tus accesorios. Elige entre tejido étnico o
            gobelino.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {miniTiles.map((tile) => (
              <button
                key={tile.filter}
                onClick={() => setActiveFilter(tile.filter)}
                className={`relative aspect-[4/3] rounded-card overflow-hidden shadow-sm transition-all ${
                  activeFilter === tile.filter
                    ? "ring-2 ring-terracotta"
                    : "hover:ring-2 hover:ring-terracotta/50"
                }`}
              >
                {tile.img ? (
                  <Image
                    src={tile.img}
                    alt={tile.label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cream to-terracotta/20" />
                )}
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-cream/90 text-texto text-sm px-4 py-1 rounded-full font-medium">
                  {tile.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Otros: subcategorías en preparación (próximamente) */}
      {activeFilter === "otros" && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed text-base md:text-lg text-balance">
            Estamos preparando nuevas colecciones hechas a mano con el mismo
            mimo que nuestras Zintas. Cinturones, abanicos, llaveros y mini
            Zintas llegarán muy pronto. ¡Vuelve para descubrirlas!
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            {otrosTiles.map((tile) => (
              <div
                key={tile.label}
                className="relative aspect-[4/3] rounded-card overflow-hidden shadow-sm cursor-default"
                aria-label={`${tile.label} (próximamente)`}
              >
                {tile.img ? (
                  <Image
                    src={tile.img}
                    alt={tile.label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cream to-terracotta/20" />
                )}
                {/* Velo + etiqueta "Próximamente" */}
                <div className="absolute inset-0 bg-texto/20" />
                <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                  Próximamente
                </span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-cream/90 text-texto text-sm px-4 py-1 rounded-full font-medium">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bolsos: texto descriptivo */}
      {activeFilter === "bolsos" && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed text-base md:text-lg text-balance">
            Estos bolsos tipo cartera están confeccionados en tela de gobelino,
            con entretela para darles más cuerpo y un interior forrado de tela
            de toldo, fácil de limpiar. Incluyen dos presillas para colgar una
            cadena y botón de metal bronce para un toque elegante. Medidas:
            20x30 cm.
          </p>
        </div>
      )}

      {/* Llaveros: texto descriptivo */}
      {activeFilter === "llaveros" && (
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-mid leading-relaxed text-base md:text-lg text-balance">
            Nuestros llaveros artesanales están tejidos a mano en tela de
            poliéster y jacquard, con flecos y una anilla metálica resistente
            para que siempre lleves un toque de color en tus llaves.
          </p>
        </div>
      )}

      {/* Grid de productos (las landings zintas/mini/otros solo muestran tiles) */}
      {!landingOnly.includes(activeFilter) && (
        <>
          <ProductGrid products={filtered} />
          {filtered.length === 0 && (
            <p className="text-center text-mid py-12">
              {enPreparacion.includes(activeFilter)
                ? "Muy pronto disponibles. ¡Estamos preparando esta colección!"
                : "No se encontraron productos en esta categoría."}
            </p>
          )}
        </>
      )}
    </>
  );
}
