"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface CatalogClientProps {
  products: Product[];
}

const filters = [
  { label: "Todos", value: "todos" },
  { label: "Bolsos", value: "bolsos" },
  { label: "Étnicas", value: "etnicas" },
  { label: "Tapicería", value: "tapiceria" },
];

export default function CatalogClient({ products }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "todos";
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (activeFilter === "todos") return products;
    return products.filter((p) => p.categoria === activeFilter);
  }, [activeFilter, products]);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === f.value
                ? "bg-terracotta text-white shadow-sm"
                : "bg-white text-texto border border-border hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {f.label}
            {activeFilter === f.value && (
              <span className="ml-1.5 text-white/80">({filtered.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <ProductGrid products={filtered} />

      {filtered.length === 0 && (
        <p className="text-center text-mid py-12">
          No se encontraron productos en esta categoría.
        </p>
      )}
    </>
  );
}
