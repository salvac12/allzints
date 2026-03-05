import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Finalizar compra",
  description: "Completa tu pedido en All Zints.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="font-heading text-3xl md:text-4xl text-texto text-center mb-10">
          Finalizar compra
        </h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
