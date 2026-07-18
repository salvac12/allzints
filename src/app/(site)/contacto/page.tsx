import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con All Zints: escríbenos y te responderemos lo antes posible.",
};

export default function ContactoPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="relative bg-dark text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-terracotta-light font-medium text-sm tracking-widest uppercase">
            Contacto
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3">
            ¿Hablamos?
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-texto">
                Envíanos un mensaje
              </h2>
              <p className="mt-3 text-mid leading-relaxed">
                ¿Tienes una duda sobre un pedido, quieres una pieza
                personalizada o simplemente saludarnos? Rellena el formulario y
                te contestamos.
              </p>
              <div className="mt-8 space-y-4 text-mid">
                <p>
                  <span className="font-medium text-texto">Email:</span>{" "}
                  <a
                    href="mailto:info@allzints.com"
                    className="text-terracotta hover:text-terracotta-light transition-colors"
                  >
                    info@allzints.com
                  </a>
                </p>
                <p>
                  <span className="font-medium text-texto">WhatsApp:</span>{" "}
                  <a
                    href="https://wa.me/34649738682?text=Hola, tengo una consulta sobre All Zints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:text-terracotta-light transition-colors"
                  >
                    Escríbenos por WhatsApp
                  </a>
                </p>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
