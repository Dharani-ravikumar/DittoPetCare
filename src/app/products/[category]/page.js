
import { notFound } from "next/navigation";
import { productCategories } from "@/data/products/index";
import ProductCategoryClient from "./ProductCategoryClient";

export default async function ProductCategoryPage({ params }) {
  const { category: slug } = await params;

  const category = productCategories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  return <ProductCategoryClient category={category} />;
}
