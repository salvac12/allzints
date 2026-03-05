import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "nombre",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "precio",
      title: "Precio (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Bolsos", value: "bolsos" },
          { title: "Zintas Étnicas", value: "etnicas" },
          { title: "Zintas Tapicería", value: "tapiceria" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen principal",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "galeria",
      title: "Galería de imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "materiales",
      title: "Materiales",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "dimensiones",
      title: "Dimensiones",
      type: "string",
    }),
    defineField({
      name: "stock",
      title: "Stock disponible",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "visible",
      title: "Visible en la tienda",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "destacado",
      title: "Producto destacado",
      type: "boolean",
      initialValue: false,
      description: "Aparecerá en la página principal",
    }),
    defineField({
      name: "oldId",
      title: "ID legacy",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "categoria",
      media: "imagen",
      precio: "precio",
      stock: "stock",
    },
    prepare({ title, subtitle, media, precio, stock }) {
      const categories: Record<string, string> = {
        bolsos: "Bolso",
        etnicas: "Zinta Étnica",
        tapiceria: "Zinta Tapicería",
      };
      return {
        title,
        subtitle: `${categories[subtitle] || subtitle} · ${precio}€ · Stock: ${stock ?? "?"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Nombre",
      name: "nombreAsc",
      by: [{ field: "nombre", direction: "asc" }],
    },
    {
      title: "Precio",
      name: "precioDesc",
      by: [{ field: "precio", direction: "desc" }],
    },
    {
      title: "Stock bajo",
      name: "stockAsc",
      by: [{ field: "stock", direction: "asc" }],
    },
  ],
});
