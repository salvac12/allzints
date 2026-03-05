import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import productosData from "@/data/productos.json";
import ProductGrid from "@/components/ProductGrid";
import NewsletterForm from "@/components/NewsletterForm";

const productos = productosData as Product[];
const latestProducts = productos.slice(-8).reverse();

const testimonials = [
  {
    name: "Laura M.",
    text: "Me encanta mi bolso de All Zints. Es precioso y se nota que está hecho con mucho cariño. Cada puntada tiene alma.",
    location: "Madrid",
  },
  {
    name: "Carmen R.",
    text: "La cinta para el móvil es súper práctica y original. Recibo cumplidos constantemente. Sin duda repetiré.",
    location: "Barcelona",
  },
  {
    name: "Ana P.",
    text: "Calidad increíble y un diseño que no encuentras en ningún sitio. Compré dos bolsos y son perfectos para el verano.",
    location: "Valencia",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white">
              Accesorios diferentes y artesanales
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/70 font-heading italic">
              con telas étnicas
            </p>
            <p className="mt-6 text-white/60 max-w-lg leading-relaxed">
              Cada pieza de All Zints está confeccionada a mano con materiales
              seleccionados. Bolsos, cintas para móvil y accesorios que cuentan
              una historia.
            </p>
            <Link
              href="/productos"
              className="inline-block mt-8 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3.5 rounded-card font-medium transition-colors text-lg"
            >
              Ver la colección
            </Link>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
                Nuestra historia
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3 leading-tight">
                Accesorios con alma mediterránea
              </h2>
              <p className="mt-6 text-mid leading-relaxed">
                All Zints nace en 2023 de la mano de Paula y María, dos amigas
                apasionadas por la artesanía y el diseño textil. Desde nuestro
                taller en España, creamos cada pieza de forma artesanal,
                combinando telas étnicas y de tapicería con un estilo
                mediterráneo y actual.
              </p>
              <p className="mt-4 text-mid leading-relaxed">
                Nuestro nombre juega con la palabra &quot;cintas&quot; — las
                llamamos &quot;zintas&quot; porque cada una tiene su propia
                personalidad. No encontrarás dos piezas exactamente iguales.
              </p>
              <Link
                href="/nosotros"
                className="inline-block mt-6 text-terracotta hover:text-terracotta-light font-medium transition-colors border-b border-terracotta hover:border-terracotta-light"
              >
                Conoce nuestra historia
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-lg">
              <Image
                src="/images/productos/Home_seccion_about.webp"
                alt="Paula y María, fundadoras de All Zints"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Últimos productos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              Novedades
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
              Últimos productos
            </h2>
          </div>
          <ProductGrid products={latestProducts} />
          <div className="text-center mt-12">
            <Link
              href="/productos"
              className="inline-block bg-dark hover:bg-texto text-white px-8 py-3 rounded-card font-medium transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Barra de confianza */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-terracotta"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-texto">Hecho a mano</h3>
              <p className="text-mid text-sm">
                Cada pieza es única, confeccionada artesanalmente en nuestro
                taller
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-terracotta"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-texto">
                Envío gratis +50€
              </h3>
              <p className="text-mid text-sm">
                Envío gratuito en pedidos superiores a 50€ en toda España
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-terracotta"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-texto">Pago seguro</h3>
              <p className="text-mid text-sm">
                Tus compras están protegidas con encriptación SSL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              Testimonios
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
              Lo que dicen nuestras clientas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-8 rounded-card shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-terracotta"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-mid leading-relaxed italic">
                  &quot;{t.text}&quot;
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-medium text-texto">{t.name}</p>
                  <p className="text-sm text-mid">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
            Newsletter
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
            Recibe 10% de descuento en tu primer pedido
          </h2>
          <p className="mt-4 text-mid">
            Suscríbete para recibir novedades, ofertas exclusivas y contenido
            sobre moda artesanal.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-mid">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>
    </>
  );
}
