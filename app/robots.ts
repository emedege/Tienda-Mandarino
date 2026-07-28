import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/carrito", "/pedido-completado"],
      },
    ],
    sitemap: "https://azulmandarino.com/sitemap.xml",
  };
}
