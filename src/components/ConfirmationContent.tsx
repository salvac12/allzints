"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl text-texto">
        Gracias por tu pedido
      </h1>

      {orderId && (
        <p className="mt-3 text-mid">
          Referencia del pedido:{" "}
          <span className="font-medium text-texto">{orderId}</span>
        </p>
      )}

      <div className="mt-8 bg-white rounded-card p-6 shadow-sm text-left space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-terracotta"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-texto text-sm">
              Confirmación por email
            </p>
            <p className="text-sm text-mid">
              Recibirás un email de SumUp con el comprobante de pago.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-terracotta"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-texto text-sm">Preparación y envío</p>
            <p className="text-sm text-mid">
              Prepararemos tu pedido en 1-3 días laborables. Te contactaremos
              cuando esté listo para enviar.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-terracotta"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-texto text-sm">
              ¿Tienes alguna duda?
            </p>
            <p className="text-sm text-mid">
              Escríbenos por{" "}
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:text-terracotta-light underline"
              >
                WhatsApp
              </a>{" "}
              y te ayudamos.
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/productos"
        className="inline-block mt-10 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-card font-medium transition-colors"
      >
        Seguir comprando
      </Link>
    </div>
  );
}
