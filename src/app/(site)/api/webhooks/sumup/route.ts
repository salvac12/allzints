import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const webhook = await request.json();

    // Always verify by fetching checkout status from SumUp
    const response = await fetch(
      `https://api.sumup.com/v0.1/checkouts/${webhook.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to verify SumUp webhook:", response.status);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const checkout = await response.json();

    console.log("=== WEBHOOK SUMUP ===");
    console.log("Checkout ID:", checkout.id);
    console.log("Referencia:", checkout.checkout_reference);
    console.log("Estado:", checkout.status);
    console.log("Monto:", checkout.amount, checkout.currency);

    if (checkout.status === "PAID") {
      console.log("PAGO CONFIRMADO para pedido:", checkout.checkout_reference);
      // In production: update DB, send confirmation email, notify merchant
    } else if (checkout.status === "FAILED") {
      console.log("PAGO FALLIDO para pedido:", checkout.checkout_reference);
    }

    console.log("=====================");

    // Always return 2xx to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Return 200 even on error to prevent retries for malformed data
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
