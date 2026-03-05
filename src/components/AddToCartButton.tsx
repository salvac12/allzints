"use client";

import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  _id: string;
  oldId?: string;
  nombre: string;
  slug: string;
  precio: number;
  categoria: string;
  imagenUrl: string;
  stock: number;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = props.stock !== undefined && props.stock <= 0;

  return (
    <button
      onClick={() =>
        addItem({
          _id: props._id,
          oldId: props.oldId,
          nombre: props.nombre,
          slug: props.slug,
          precio: props.precio,
          categoria: props.categoria,
          imagenUrl: props.imagenUrl,
        })
      }
      disabled={outOfStock}
      className={`w-full py-3.5 rounded-card font-medium transition-colors text-lg ${
        outOfStock
          ? "bg-border text-mid cursor-not-allowed"
          : "bg-terracotta hover:bg-terracotta-light text-white"
      }`}
    >
      {outOfStock ? "Agotado" : "Añadir al carrito"}
    </button>
  );
}
