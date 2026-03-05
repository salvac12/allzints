import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Product, LegacyProduct } from "@/types/product";
import { client, isSanityConfigured } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  productBySlugQuery,
  allSlugsQuery,
  relatedProductsQuery,
} from "@/sanity/queries";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGrid from "@/components/ProductGrid";
import productosData from "@/data/productos.json";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function legacyToProduct(p: LegacyProduct): Product {
  return {
    _id: p.id,
    nombre: p.nombre,
    slug: slugify(p.nombre),
    precio: p.precio,
    categoria: p.categoria,
    imagen: { _type: "image", asset: { _ref: "", _type: "reference" } },
    descripcion: p.descripcion,
    materiales: p.materiales,
    dimensiones: p.dimensiones,
    stock: 10,
    oldId: p.id,
  };
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  if (isSanityConfigured) {
    const slugs: string[] = await client.fetch(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  }
  const legacy = productosData as LegacyProduct[];
  return legacy.map((p) => ({ slug: slugify(p.nombre) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let product: Product | null;
  if (isSanityConfigured) {
    product = await client.fetch(productBySlugQuery, { slug: params.slug });
  } else {
    const legacy = productosData as LegacyProduct[];
    const found = legacy.find((p) => slugify(p.nombre) === params.slug);
    product = found ? legacyToProduct(found) : null;
  }
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.nombre,
    description: product.descripcion,
  };
}

export default async function ProductPage({ params }: Props) {
  let product: Product | null;
  let related: Product[];

  if (isSanityConfigured) {
    product = await client.fetch(productBySlugQuery, { slug: params.slug });
    if (!product) notFound();
    related = await client.fetch(relatedProductsQuery, {
      categoria: product.categoria,
      slug: product.slug,
    });
  } else {
    const legacy = productosData as LegacyProduct[];
    const found = legacy.find((p) => slugify(p.nombre) === params.slug);
    if (!found) notFound();
    product = legacyToProduct(found);
    related = legacy
      .filter((p) => p.categoria === found.categoria && p.id !== found.id)
      .slice(0, 4)
      .map(legacyToProduct);
  }

  const categoryLabels: Record<string, string> = {
    bolsos: "Bolsos",
    etnicas: "Zintas Étnicas",
    tapiceria: "Zintas Tapicería",
  };

  const mainImageUrl =
    isSanityConfigured && product.imagen?.asset?._ref
      ? urlFor(product.imagen).width(800).height(800).url()
      : "/images/productos/Logo.webp";

  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-mid">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/productos"
            className="hover:text-terracotta transition-colors"
          >
            Productos
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/productos?categoria=${product.categoria}`}
            className="hover:text-terracotta transition-colors"
          >
            {categoryLabels[product.categoria]}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-texto">{product.nombre}</span>
        </nav>

        {/* Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-card overflow-hidden shadow-lg bg-white">
            <Image
              src={mainImageUrl}
              alt={product.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {outOfStock && (
              <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
                <span className="bg-white text-texto text-lg px-6 py-2 rounded-full font-medium">
                  Agotado
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
              {categoryLabels[product.categoria]}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl text-texto mt-2 leading-tight">
              {product.nombre}
            </h1>
            <p className="text-terracotta text-2xl md:text-3xl font-semibold mt-4">
              {product.precio.toFixed(2)}€
            </p>

            <p className="mt-6 text-mid leading-relaxed">
              {product.descripcion}
            </p>

            {/* Materials */}
            {product.materiales && product.materiales.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-texto uppercase tracking-wide">
                  Materiales
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.materiales.map((mat) => (
                    <span
                      key={mat}
                      className="px-3 py-1 bg-white rounded-full text-sm text-mid border border-border"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensiones && (
              <p className="mt-4 text-sm text-mid">
                <span className="font-medium text-texto">Dimensiones:</span>{" "}
                {product.dimensiones}
              </p>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <AddToCartButton
                _id={product._id}
                oldId={product.oldId}
                nombre={product.nombre}
                slug={product.slug}
                precio={product.precio}
                categoria={product.categoria}
                imagenUrl={mainImageUrl}
                stock={product.stock}
              />
              <a
                href={`https://wa.me/34600000000?text=Hola, me interesa el producto: ${product.nombre}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-card border-2 border-border text-texto hover:border-terracotta hover:text-terracotta transition-colors font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>

            {/* Artisan disclaimer */}
            <p className="mt-6 text-xs text-mid italic leading-relaxed">
              * Al tratarse de un producto artesanal, pueden existir pequeñas
              variaciones en color y textura respecto a la imagen. Cada pieza es
              única y eso forma parte de su encanto.
            </p>
          </div>
        </div>

        {/* Gallery */}
        {product.galeria && product.galeria.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl text-texto mb-4">
              Más imágenes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.galeria.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-card overflow-hidden shadow-sm bg-white"
                >
                  <Image
                    src={urlFor(img).width(400).height(400).url()}
                    alt={`${product.nombre} - imagen ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl md:text-3xl text-texto text-center mb-10">
              También te puede gustar
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
