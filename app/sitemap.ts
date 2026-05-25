import { MetadataRoute } from "next";
import { getAllProducts, getAllBlogPosts } from "@/lib/sanity/queries";

const BASE_URL = "https://azulmandarino.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/tienda`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/sobre-mi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/encargo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const [products, posts] = await Promise.all([
      getAllProducts(),
      getAllBlogPosts(),
    ]);
    productPages = products.map((p) => ({
      url: `${BASE_URL}/tienda/${p.slug.current}`,
      lastModified: new Date(p._createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    blogPages = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug.current}`,
      lastModified: new Date(p._createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sanity not configured
  }

  return [...staticPages, ...productPages, ...blogPages];
}
