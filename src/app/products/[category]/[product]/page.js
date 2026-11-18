
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { productCategories } from "@/data/products";

export default async function ProductDetailsPage({ params }) {
  const { category: categorySlug, product: productSlug } = await params;

  const category = productCategories.find(
    (item) => item.slug === categorySlug
  );

  if (!category) notFound();

  const product = category.products.find(
    (item) => item.slug === productSlug
  );

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#FAF7EE] px-5 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <Link
          href={`/products/${category.slug}`}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#526D68] transition hover:text-[#287C78]"
        >
  
          <ArrowLeft size={18} />
          Back to {category.title}
        </Link>

        {/* Product Details */}
        <div className="grid items-center gap-12 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-12">

          {/* Product Image */}
          <div className="flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-[#F0F5F2] p-8 md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Information */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#287C78]">
              {category.title}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#244B49] sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-base leading-8 text-[#526D68]">
              {product.description}
            </p>

            <p className="mt-7 text-3xl font-bold text-[#287C78]">
              ₹{product.price}
            </p>

            <div className="my-8 h-px bg-[#DCE9E5]" />

            <h2 className="text-lg font-semibold text-[#244B49]">
              Product Details
            </h2>

            <ul className="mt-5 space-y-4">
              {product.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-[#526D68]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                    <Check size={13} />
                  </span>
                  {detail}
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-[#287C78] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#244B49] sm:w-auto"
            >
              <ShoppingBag size={18} />
              Add to Cart
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Other Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-[#244B49]">
            Explore Other Products
          </h2>

          <p className="mt-2 text-sm text-[#526D68]">
            Discover more essentials for your pet.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {category.products
              .filter((item) => item.slug !== product.slug)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${category.slug}/${item.slug}`}
                  className="rounded-full border border-[#DCE9E5] bg-white px-5 py-3 text-sm font-medium text-[#244B49] transition hover:border-[#287C78] hover:bg-[#DDEFEA]"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
