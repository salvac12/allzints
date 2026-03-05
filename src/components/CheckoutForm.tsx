"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, useCartTotal, useCartCount } from "@/store/cartStore";
import type { ShippingInfo } from "@/types/order";

export default function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const total = useCartTotal();
  const count = useCartCount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [shipping, setShipping] = useState<ShippingInfo>({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    provincia: "",
    notas: "",
  });

  const updateField = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        _id: item._id,
        oldId: item.oldId,
        nombre: item.nombre,
        precio: item.precio,
        quantity: item.quantity,
        imagenUrl: item.imagenUrl,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          shipping,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el pedido");
      }

      // Store order ID for confirmation page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastOrderId", data.orderId);
      }

      // Clear cart and redirect to SumUp hosted checkout
      clearCart();
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el pedido"
      );
      setLoading(false);
    }
  };

  if (count === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-mid text-lg mb-6">Tu carrito está vacío</p>
        <Link
          href="/productos"
          className="inline-block bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-card font-medium transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping form */}
        <div>
          <h2 className="font-heading text-xl text-texto mb-6">
            Datos de envío
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-texto mb-1"
                >
                  Nombre *
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={shipping.nombre}
                  onChange={(e) => updateField("nombre", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="apellidos"
                  className="block text-sm font-medium text-texto mb-1"
                >
                  Apellidos *
                </label>
                <input
                  id="apellidos"
                  type="text"
                  required
                  value={shipping.apellidos}
                  onChange={(e) => updateField("apellidos", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-texto mb-1"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={shipping.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-texto mb-1"
              >
                Teléfono *
              </label>
              <input
                id="telefono"
                type="tel"
                required
                value={shipping.telefono}
                onChange={(e) => updateField("telefono", e.target.value)}
                className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-texto mb-1"
              >
                Dirección *
              </label>
              <input
                id="direccion"
                type="text"
                required
                placeholder="Calle, número, piso, puerta"
                value={shipping.direccion}
                onChange={(e) => updateField("direccion", e.target.value)}
                className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="codigoPostal"
                  className="block text-sm font-medium text-texto mb-1"
                >
                  Código postal *
                </label>
                <input
                  id="codigoPostal"
                  type="text"
                  required
                  value={shipping.codigoPostal}
                  onChange={(e) => updateField("codigoPostal", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="ciudad"
                  className="block text-sm font-medium text-texto mb-1"
                >
                  Ciudad *
                </label>
                <input
                  id="ciudad"
                  type="text"
                  required
                  value={shipping.ciudad}
                  onChange={(e) => updateField("ciudad", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="provincia"
                className="block text-sm font-medium text-texto mb-1"
              >
                Provincia *
              </label>
              <input
                id="provincia"
                type="text"
                required
                value={shipping.provincia}
                onChange={(e) => updateField("provincia", e.target.value)}
                className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="notas"
                className="block text-sm font-medium text-texto mb-1"
              >
                Notas del pedido
              </label>
              <textarea
                id="notas"
                rows={3}
                placeholder="Instrucciones especiales para la entrega (opcional)"
                value={shipping.notas}
                onChange={(e) => updateField("notas", e.target.value)}
                className="w-full px-4 py-2.5 rounded-card border border-border bg-white focus:outline-none focus:border-terracotta transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <h2 className="font-heading text-xl text-texto mb-6">Tu pedido</h2>
          <div className="bg-white rounded-card p-6 shadow-sm">
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.imagenUrl}
                      alt={item.nombre}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-texto truncate">
                      {item.nombre}
                    </p>
                    <p className="text-xs text-mid">
                      {item.precio.toFixed(2)}€ x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-texto whitespace-nowrap">
                    {(item.precio * item.quantity).toFixed(2)}€
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm text-mid">
                <span>Subtotal ({count} artículos)</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-mid">Envío</span>
                <span className={total >= 50 ? "text-green-700 font-medium" : "text-mid"}>
                  {total >= 50 ? "Gratis" : "3.95€"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-heading pt-2 border-t border-border">
                <span className="text-texto">Total</span>
                <span className="text-terracotta font-semibold">
                  {(total >= 50 ? total : total + 3.95).toFixed(2)}€
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-card text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3.5 rounded-card font-medium text-lg transition-colors ${
                loading
                  ? "bg-mid text-white cursor-wait"
                  : "bg-terracotta hover:bg-terracotta-light text-white"
              }`}
            >
              {loading ? "Procesando..." : "Pagar con tarjeta"}
            </button>

            <p className="mt-3 text-xs text-mid text-center">
              Serás redirigido a SumUp para completar el pago de forma segura.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
