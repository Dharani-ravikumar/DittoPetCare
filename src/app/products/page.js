
import ProductCategoryClient from "./[category]/ProductCategoryClient";

const allProductsCategory = {
  slug: "all",
  title: "All Products",
  description:
    "Explore our complete collection of pet essentials. Find everything your furry friend needs in one place.",
  image: "/images/products/all.png",
  products: [],
};

export default function AllProductsPage() {
  return <ProductCategoryClient category={allProductsCategory} />;
}
