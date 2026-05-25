import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre de la pieza",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL amigable",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Fotos de la pieza",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "materials",
      title: "Materiales",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Resina", value: "Resina" },
          { title: "Arcilla polimérica", value: "Arcilla polimérica" },
          { title: "Cristal", value: "Cristal" },
          { title: "Metal dorado", value: "Metal dorado" },
          { title: "Metal plateado", value: "Metal plateado" },
          { title: "Acero inoxidable", value: "Acero inoxidable" },
          { title: "Madera", value: "Madera" },
          { title: "Nácar", value: "Nácar" },
          { title: "Perlas", value: "Perlas" },
        ],
      },
    }),
    defineField({
      name: "dimensions",
      title: "Medidas",
      type: "string",
      description: "Ej: 4 cm de largo x 2 cm de ancho",
    }),
    defineField({
      name: "weight",
      title: "Peso aproximado",
      type: "string",
      description: "Ej: 5g",
    }),
    defineField({
      name: "inStock",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
      description: "Desactivar cuando la pieza esté vendida",
    }),
    defineField({
      name: "featured",
      title: "Destacado en portada",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO (opcional)",
      type: "string",
      description: "Si lo dejas en blanco, se usará el nombre de la pieza",
    }),
    defineField({
      name: "seoDescription",
      title: "Descripción SEO (opcional)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      price: "price",
      inStock: "inStock",
    },
    prepare({ title, media, price, inStock }) {
      return {
        title,
        media,
        subtitle: `${price}€ · ${inStock ? "Disponible" : "Vendida"}`,
      };
    },
  },
});
