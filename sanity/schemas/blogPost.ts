import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "post",
  title: "Entrada del blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "resina",
          "arcilla polimérica",
          "tutorial",
          "inspiración",
          "novedades",
          "tendencias",
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString("es-ES") : "",
      };
    },
  },
});
