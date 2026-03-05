"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { urlFor } from "@/sanity/image";

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

  const imageUrl =
    product.imagen?.asset?._ref
      ? urlFor(product.imagen).width(600).height(600).url()
      : "/images/productos/Logo.webp";

  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="group bg-white rounded-card shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-sm text-texto text-xs px-2.5 py-1 rounded-full font-medium">
            {categoryLabel[product.categoria] || product.categoria}
          </span>
          {outOfStock && (
            <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
              <span className="bg-white text-texto text-sm px-4 py-1.5 rounded-full font-medium">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-heading text-texto text-base leading-tight hover:text-terracotta transition-colors">
            {product.nombre}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-terracotta font-semibold text-lg">
            {product.precio.toFixed(2)}€
          </span>
          <button
            onClick={() =>
              addItem({
                _id: product._id,
                oldId: product.oldId,
                nombre: product.nombre,
                slug: product.slug,
                precio: product.precio,
                categoria: product.categoria,
                imagenUrl: imageUrl,
              })
            }
            disabled={outOfStock}
            className={`text-xs px-3 py-2 rounded-full font-medium transition-colors ${
              outOfStock
                ? "bg-border text-mid cursor-not-allowed"
                : "bg-dark text-white hover:bg-terracotta"
            }`}
            aria-label={`Añadir ${product.nombre} al carrito`}
          >
            {outOfStock ? "Agotado" : "Añadir"}
          </button>
        </div>
      </div>
    </div>
  );
}
