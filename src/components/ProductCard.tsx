"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const categoryLabel: Record<string, string> = {
    bolsos: "Bolso",
    etnicas: "Zinta Étnica",
    tapiceria: "Zinta Tapicería",
  };

  return (
    <div className="group bg-white rounded-card shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <Link href={`/productos/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={`/images/productos/${product.imagen}`}
            alt={product.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-sm text-texto text-xs px-2.5 py-1 rounded-full font-medium">
            {categoryLabel[product.categoria] || product.categoria}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/productos/${product.id}`}>
          <h3 className="font-heading text-texto text-base leading-tight hover:text-terracotta transition-colors">
            {product.nombre}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-terracotta font-semibold text-lg">
            {product.precio.toFixed(2)}€
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-dark text-white text-xs px-3 py-2 rounded-full hover:bg-terracotta transition-colors font-medium"
            aria-label={`Añadir ${product.nombre} al carrito`}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
