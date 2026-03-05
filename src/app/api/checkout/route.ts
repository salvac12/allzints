import { NextRequest, NextResponse } from "next/server";
import type { ShippingInfo, OrderItem } from "@/types/order";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { productPriceQuery } from "@/sanity/queries";

const sanityConfigured = !!projectId;

// Server-side Sanity client (no CDN cache for price validation)
// Only created when projectId is available
const serverClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

interface CheckoutBody {
  items: OrderItem[];
  shipping: ShippingInfo;
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();
    const { items, shipping, total } = body;

    // Validate
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    if (!shipping.nombre || !shipping.email || !shipping.direccion) {
      return NextResponse.json(
        { error: "Faltan datos de envío obligatorios" },
        { status: 400 }
      );
    }

    // Validate prices and stock from Sanity (server-side, no CDN)
    let serverTotal = 0;

    if (serverClient && sanityConfigured) {
      for (const item of items) {
        const sanityProduct = await serverClient.fetch(productPriceQuery, {
          id: item._id,
        });

        if (!sanityProduct) {
          return NextResponse.json(
            { error: `Producto no encontrado: ${item.nombre}` },
            { status: 400 }
          );
        }

        if (!sanityProduct.visible) {
          return NextResponse.json(
            { error: `Producto no disponible: ${item.nombre}` },
            { status: 400 }
          );
        }

        if (sanityProduct.stock !== undefined && sanityProduct.stock < item.quantity) {
          return NextResponse.json(
            { error: `Stock insuficiente para: ${item.nombre}` },
            { status: 400 }
          );
        }

        // Use Sanity price (source of truth), not the client-sent price
        serverTotal += sanityProduct.precio * item.quantity;
      }
    } else {
      // Fallback: recalculate from client-sent prices
      serverTotal = items.reduce(
        (sum, item) => sum + item.precio * item.quantity,
        0
      );
    }

    if (Math.abs(serverTotal - total) > 0.01) {
      return NextResponse.json(
        { error: "Los precios han cambiado. Recarga la página e inténtalo de nuevo." },
        { status: 400 }
      );
    }

    const orderId = `AZ-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Build description for SumUp
    const description = items
      .map((i) => `${i.nombre} x${i.quantity}`)
      .join(", ");

    // Create SumUp checkout
    const sumupResponse = await fetch(
      "https://api.sumup.com/v0.1/checkouts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkout_reference: orderId,
          amount: parseFloat(serverTotal.toFixed(2)),
          currency: "EUR",
          merchant_code: process.env.SUMUP_MERCHANT_CODE,
          description: `All Zints — ${description}`.slice(0, 140),
          redirect_url: `${baseUrl}/pedido/confirmacion?order=${orderId}`,
          return_url: `${baseUrl}/api/webhooks/sumup`,
        }),
      }
    );

    if (!sumupResponse.ok) {
      const errorData = await sumupResponse.text();
      console.error("SumUp error:", sumupResponse.status, errorData);
      return NextResponse.json(
        { error: "Error al crear el pago. Inténtalo de nuevo." },
        { status: 500 }
      );
    }

    const checkout = await sumupResponse.json();

    // Log order for the merchant (replace with DB in production)
    console.log("=== NUEVO PEDIDO ===");
    console.log("Order ID:", orderId);
    console.log("SumUp Checkout ID:", checkout.id);
    console.log("Total:", serverTotal.toFixed(2), "€");
    console.log("Cliente:", shipping.nombre, shipping.apellidos);
    console.log("Email:", shipping.email);
    console.log("Teléfono:", shipping.telefono);
    console.log(
      "Dirección:",
      shipping.direccion,
      shipping.codigoPostal,
      shipping.ciudad,
      shipping.provincia
    );
    console.log("Notas:", shipping.notas || "—");
    console.log("Productos:", description);
    console.log("====================");

    return NextResponse.json({
      orderId,
      checkoutUrl: checkout.hosted_checkout_url || `https://pay.sumup.com/b/${checkout.id}`,
      checkoutId: checkout.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
