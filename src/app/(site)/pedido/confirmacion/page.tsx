import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationContent from "@/components/ConfirmationContent";

export const metadata: Metadata = {
  title: "Pedido confirmado",
  description: "Tu pedido en All Zints ha sido procesado correctamente.",
};

export default function ConfirmacionPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Suspense
          fallback={
            <div className="text-center py-12 text-mid">Verificando pago...</div>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
