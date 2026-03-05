"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, useCartTotal, useCartCount } from "@/store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } =
    useCartStore();
  const total = useCartTotal();
  const count = useCartCount();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 cart-overlay"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-cream shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-heading text-xl text-texto">
              Tu carrito ({count})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-mid hover:text-texto transition-colors"
              aria-label="Cerrar carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-mid">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-16 h-16 mb-4 opacity-40"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p className="text-lg font-heading">Tu carrito está vacío</p>
                <p className="text-sm mt-1">
                  Descubre nuestros accesorios artesanales
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white rounded-card p-3 shadow-sm"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={`/images/productos/${item.imagen}`}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-texto truncate">
                        {item.nombre}
                      </h3>
                      <p className="text-terracotta font-medium text-sm mt-0.5">
                        {item.precio.toFixed(2)}€
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-mid hover:border-terracotta hover:text-terracotta transition-colors text-sm"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-mid hover:border-terracotta hover:text-terracotta transition-colors text-sm"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-mid/40 hover:text-terracotta transition-colors self-start"
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border px-6 py-4 space-y-4">
              {total < 50 && (
                <p className="text-sm text-mid text-center">
                  Te faltan{" "}
                  <span className="font-medium text-terracotta">
                    {(50 - total).toFixed(2)}€
                  </span>{" "}
                  para envío gratis
                </p>
              )}
              {total >= 50 && (
                <p className="text-sm text-green-700 text-center font-medium">
                  Tienes envío gratis
                </p>
              )}
              <div className="flex items-center justify-between text-lg">
                <span className="font-heading text-texto">Subtotal</span>
                <span className="font-heading text-terracotta font-semibold">
                  {total.toFixed(2)}€
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-terracotta hover:bg-terracotta-light text-white py-3 rounded-card font-medium transition-colors text-center"
              >
                Finalizar compra
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
