import { groq } from "next-sanity";

// All visible products
export const allProductsQuery = groq`
  *[_type == "product" && visible == true] | order(nombre asc) {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    descripcion,
    materiales,
    dimensiones,
    stock,
    oldId
  }
`;

// Single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    galeria,
    descripcion,
    materiales,
    dimensiones,
    stock,
    oldId
  }
`;

// Single product by legacy ID (for backwards compatibility)
export const productByOldIdQuery = groq`
  *[_type == "product" && oldId == $oldId][0] {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    galeria,
    descripcion,
    materiales,
    dimensiones,
    stock,
    oldId
  }
`;

// Products by category
export const productsByCategoryQuery = groq`
  *[_type == "product" && visible == true && categoria == $categoria] | order(nombre asc) {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    stock,
    oldId
  }
`;

// Featured / latest products for homepage
export const featuredProductsQuery = groq`
  *[_type == "product" && visible == true] | order(_createdAt desc) [0...8] {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    stock,
    oldId
  }
`;

// All slugs for generateStaticParams
export const allSlugsQuery = groq`
  *[_type == "product" && visible == true].slug.current
`;

// Related products (same category, exclude current)
export const relatedProductsQuery = groq`
  *[_type == "product" && visible == true && categoria == $categoria && slug.current != $slug] | order(nombre asc) [0...4] {
    _id,
    nombre,
    "slug": slug.current,
    precio,
    categoria,
    imagen,
    stock,
    oldId
  }
`;

// Product for checkout validation (server-side, by _id)
export const productPriceQuery = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    oldId,
    precio,
    stock,
    visible
  }
`;
