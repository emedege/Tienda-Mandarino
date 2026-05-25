import { client, isSanityConfigured } from "./client";

function requireSanity() {
  if (!isSanityConfigured()) throw new Error("Sanity not configured");
}

export interface Product {
  _id: string;
  _createdAt: string;
  name: string;
  slug: { current: string };
  price: number;
  description: string;
  materials: string[];
  category: { title: string; slug: { current: string } };
  images: Array<{ _key: string; asset: { _ref: string } }>;
  inStock: boolean;
  featured: boolean;
  dimensions?: string;
  weight?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: unknown[];
  mainImage: { asset: { _ref: string } };
  publishedAt: string;
  tags: string[];
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

const productFields = `
  _id,
  _createdAt,
  name,
  slug,
  price,
  description,
  materials,
  category->{ title, slug },
  images,
  inStock,
  featured,
  dimensions,
  weight,
  seoTitle,
  seoDescription
`;

export async function getAllProducts(): Promise<Product[]> {
  requireSanity();
  return client.fetch(
    `*[_type == "product"] | order(_createdAt desc) { ${productFields} }`
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  requireSanity();
  return client.fetch(
    `*[_type == "product" && featured == true && inStock == true][0...6] { ${productFields} }`
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  requireSanity();
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] { ${productFields} }`,
    { slug }
  );
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  requireSanity();
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) { ${productFields} }`,
    { categorySlug }
  );
}

export async function getAllCategories(): Promise<Category[]> {
  requireSanity();
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description }`
  );
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  requireSanity();
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, _createdAt, title, slug, excerpt, mainImage, publishedAt, tags
    }`
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  requireSanity();
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, _createdAt, title, slug, excerpt, body, mainImage, publishedAt, tags
    }`,
    { slug }
  );
}
