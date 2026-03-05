import type { Metadata } from "next";
import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia de All Zints: accesorios artesanales hechos a mano con telas étnicas y de tapicería. Fundado en 2023 por Paula y María.",
};

const faqs = [
  {
    question: "¿Cuánto tarda el envío?",
    answer:
      "Los pedidos se preparan en 1-3 días laborables. El envío estándar tarda entre 3 y 5 días laborables en España peninsular. Para Baleares, Canarias y envíos internacionales, puede tardar un poco más.",
  },
  {
    question: "¿Los productos son exactamente como en las fotos?",
    answer:
      "Al ser productos artesanales confeccionados a mano, pueden existir pequeñas variaciones en color, textura y acabado. Esto es precisamente lo que los hace únicos. Cada pieza tiene su propia personalidad.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí, aceptamos devoluciones en un plazo de 14 días desde la recepción del pedido, siempre que el producto esté en su estado original y sin usar. Contacta con nosotras para gestionar la devolución.",
  },
  {
    question: "¿Las cintas para móvil son universales?",
    answer:
      "Sí, todas nuestras zintas incluyen un adaptador universal compatible con la mayoría de smartphones. Funcionan con o sin funda. El mosquetón permite engancharla y desengancharla fácilmente.",
  },
  {
    question: "¿Hacéis pedidos personalizados?",
    answer:
      "Estamos abiertos a consultas sobre pedidos especiales o personalizaciones. Escríbenos por WhatsApp o por email y te contamos las opciones disponibles.",
  },
  {
    question: "¿Cómo puedo cuidar mi bolso o cinta?",
    answer:
      "Recomendamos limpiar los productos con un paño húmedo. Evitar sumergir en agua. Para los bolsos de lino, se puede planchar con vapor a temperatura baja. Guardar en un lugar seco y ventilado.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative bg-dark text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-terracotta-light font-medium text-sm tracking-widest uppercase">
            Nuestra historia
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3">
            Detrás de cada puntada
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Dos amigas, un taller y la pasión por crear accesorios que cuentan
            historias.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-lg">
              <Image
                src="/images/productos/Home_seccion_about.webp"
                alt="Paula y María en su taller"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-texto leading-tight">
                Paula y María, creadoras de All Zints
              </h2>
              <div className="mt-6 space-y-4 text-mid leading-relaxed">
                <p>
                  Todo empezó en 2023 con una idea sencilla: crear accesorios
                  que fueran diferentes, con personalidad, hechos a mano y con
                  materiales que nos enamoraran. Paula siempre tuvo pasión por
                  los textiles étnicos y María por el diseño y la costura.
                  Juntas, decidimos convertir esa pasión en All Zints.
                </p>
                <p>
                  El nombre nace de nuestro producto estrella: las cintas para
                  móvil, que nosotras llamamos &quot;zintas&quot; porque cada
                  una tiene su propia personalidad. Empezamos vendiéndolas entre
                  amigas y familia, y pronto descubrimos que había mucha gente
                  buscando algo así: accesorios únicos, artesanales, con ese
                  toque mediterráneo que nos define.
                </p>
                <p>
                  Hoy, desde nuestro taller en España, seguimos confeccionando
                  cada pieza a mano. Seleccionamos cuidadosamente las telas
                  étnicas y de tapicería, buscando siempre calidad, color y
                  originalidad. No encontrarás dos piezas exactamente iguales,
                  y eso es lo que más nos gusta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              Lo que nos mueve
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
              Misión y Visión
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cream p-8 md:p-10 rounded-card">
              <h3 className="font-heading text-2xl text-texto">
                Nuestra Misión
              </h3>
              <p className="mt-4 text-mid leading-relaxed">
                Crear accesorios artesanales únicos que permitan a cada persona
                expresar su estilo con piezas hechas a mano, con materiales de
                calidad y con el sello de la artesanía mediterránea. Queremos
                demostrar que lo hecho a mano tiene un valor especial.
              </p>
            </div>
            <div className="bg-cream p-8 md:p-10 rounded-card">
              <h3 className="font-heading text-2xl text-texto">
                Nuestra Visión
              </h3>
              <p className="mt-4 text-mid leading-relaxed">
                Convertirnos en una marca referente de accesorios artesanales en
                España, creciendo de forma sostenible y manteniendo siempre la
                esencia de lo hecho a mano. Queremos construir una comunidad de
                personas que valoren la artesanía y el diseño con alma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
            Comunidad
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
            Más que una marca, una comunidad
          </h2>
          <p className="mt-6 text-mid leading-relaxed">
            En All Zints no solo vendemos accesorios. Hemos creado una comunidad
            de personas que comparten nuestra pasión por lo artesanal, lo
            original y lo hecho con cariño. Nos encanta ver cómo cada clienta
            hace suyos nuestros productos y los combina a su manera.
          </p>
          <p className="mt-4 text-mid leading-relaxed">
            Síguenos en Instagram para ver las últimas novedades, inspiración de
            estilo y el día a día en nuestro taller. Nos encanta compartir el
            proceso creativo con vosotras.
          </p>
          <a
            href="https://www.instagram.com/allzints/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-card font-medium transition-colors"
          >
            Síguenos en Instagram
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" id="contacto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              Preguntas frecuentes
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-texto mt-3">
              ¿Tienes dudas?
            </h2>
          </div>
          <FAQAccordion items={faqs} />
          <div className="mt-12 text-center">
            <p className="text-mid">
              ¿No encuentras lo que buscas? Escríbenos directamente.
            </p>
            <a
              href="https://wa.me/34600000000?text=Hola, tengo una consulta sobre All Zints"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-terracotta hover:text-terracotta-light font-medium transition-colors border-b border-terracotta hover:border-terracotta-light"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
