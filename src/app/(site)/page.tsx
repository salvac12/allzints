import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import PhotoCarousel from "@/components/PhotoCarousel";

const heroImages = [
  { src: "/images/productos/Hero-Modelo-Budapest.jpg", alt: "Modelo con cinta de móvil Budapest" },
  { src: "/images/productos/Hero-Lisboa.jpg", alt: "Bolso y cinta de móvil Lisboa" },
  { src: "/images/productos/Hero-Modelo-NY.jpg", alt: "Modelo con bolso Nueva York" },
  { src: "/images/productos/Hero-Modelo-Santorini.jpg", alt: "Modelo con bolso Santorini" },
  { src: "/images/productos/Hero-Modelo-Mallorca.jpg", alt: "Modelo con bolso Mallorca" },
];

const galleryImages = [
  { src: "/images/productos/Cinta-Etnica-Fucsia.webp", alt: "Zinta étnica fucsia" },
  { src: "/images/productos/Bolso-Marrackech.webp", alt: "Bolso Marrakech" },
  { src: "/images/productos/Cinta-Ibiza-Rosa.webp", alt: "Zinta Ibiza rosa" },
  { src: "/images/productos/Bolso-Atenas.webp", alt: "Bolso Atenas" },
  { src: "/images/productos/Cinta-Etnica-Mostaza.webp", alt: "Zinta étnica mostaza" },
  { src: "/images/productos/Bolso-Nueva-York.webp", alt: "Bolso Nueva York" },
  { src: "/images/productos/Cinta-Santorini.webp", alt: "Zinta Santorini" },
  { src: "/images/productos/Bolso-Lisboa.webp", alt: "Bolso Lisboa" },
];

const testimonials = [
  {
    name: "Rosa López",
    text: "¡Las cintas de móvil son una maravilla! Me encanta cómo sujetan el móvil de forma segura sin que se caiga, y el diseño es súper elegante. Perfectas para el día a día, las recomiendo al 100%.",
  },
  {
    name: "María Ruiz",
    text: "Bonitas, funcionales y muy cómodas. La cinta cuelga-móvil me ha salvado de extraviar el teléfono. Envío rápido y producto tal como se describe en la web.",
  },
  {
    name: "Laura Gómez",
    text: "¡Adoro mi cinta cuelga móvil! Es ligera y con un diseño precioso que va con todo. Ahora llevo el móvil siempre a mano sin miedo a que se me caiga, ideal para salir a correr o pasear. ¡Feliz con mi compra!",
  },
  {
    name: "David Herrera",
    text: "¡La cinta cuelga móvil es genial para una persona como yo! La uso en el gimnasio y para ir en bici. Diseño práctico y resistente, la mejor compra que he hecho últimamente.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero con fotos que ruedan */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <PhotoCarousel
            images={heroImages}
            className="h-full w-full"
            sizes="100vw"
            priority
            showDots={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white">
              Accesorios diferentes y artesanales
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 font-heading italic">
              con telas étnicas
            </p>
            <p className="mt-6 text-white/70 max-w-lg leading-relaxed">
              Cada pieza de All Zints está confeccionada a mano con materiales
              seleccionados. Bolsos, cintas para móvil y accesorios que cuentan
              una historia.
            </p>
          </div>
        </div>
      </section>

      {/* Galería de fotos */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              Nuestras creaciones
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
              Hechas a mano, una a una
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="relative aspect-square rounded-card overflow-hidden shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
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
                Envío a toda España
              </h3>
              <p className="text-mid text-sm">
                Envío ordinario (3€) o rápido (5€) a península
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
              Lo que dicen los clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-8 rounded-card shadow-sm">
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
