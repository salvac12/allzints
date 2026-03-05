"use client";

import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full bg-terracotta hover:bg-terracotta-light text-white py-3.5 rounded-card font-medium transition-colors text-lg"
    >
      Añadir al carrito
    </button>
  );
}
