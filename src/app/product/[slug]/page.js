
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  return <ProductDetailsClient slug={slug} />;
}
