import { notFound, redirect } from "next/navigation";
import { getPublicProductBySlug } from "@/lib/shop";
import { buildStorefrontProductPath } from "@/lib/storefront";

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const search = await searchParams;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const destination = buildStorefrontProductPath(product.slug, product.paymentProfile?.ownerId);
  redirect(search.error ? `${destination}?error=${encodeURIComponent(search.error)}` : destination);
}
