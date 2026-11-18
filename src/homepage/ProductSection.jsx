
"use client";

import { useState } from "react";
import { productCategories } from "@/data/products/index";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowUpRight,
  Footprints,
  Utensils,
  BedDouble,
  Sparkles,
  Bone,
} from "lucide-react";

const categoryIcons = {
  "walking-safety": Footprints,
  "feeding-hydration": Utensils,
  "comfort-sleep": BedDouble,
  "clean-care": Sparkles,
  toys: Bone,
};

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section
      id="products"
      className="bg-[#FFFFFF] px-5 py-16 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#287C78]">
            Explore Our Collection
          </p>

          <h2 className="text-2xl font-bold text-[#244B49] sm:text-3xl">
            Everything Your Pet Needs
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#526D68]">
            Discover carefully selected essentials to keep your furry friends
            happy, healthy and comfortable.
          </p>
        </motion.div>

        {/* Product Category Cards */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-5">

          {productCategories.map((category, index) => {
            const CategoryIcon = categoryIcons[category.slug];

            const isTouchActive =
              activeCategory === category.slug;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative z-0 mt-8 hover:z-20"
              >
                <Link
                  href={`/products/${category.slug}`}
                  onClick={(e) => {
                    if (activeCategory !== category.slug) {
                      e.preventDefault();
                      setActiveCategory(category.slug);
                    }
                  }}
                  className="group relative block min-h-[200px] cursor-pointer overflow-visible rounded-3xl border border-[#DCE9E5] bg-white p-4 pb-12 shadow-[0_5px_18px_rgba(40,124,120,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#287C78]/40 hover:shadow-[0_12px_30px_rgba(40,124,120,0.20)] active:scale-[0.98]"
                >

                  {/* Decorative Corner */}
                  <div className="pointer-events-none absolute right-0 top-0 h-18 w-20 rounded-bl-full bg-[#DDEFEA] transition-all duration-500 group-hover:scale-0" />

                  {/* Category Image */}
                  <div
                    className={`pointer-events-none absolute left-1/2 top-0 z-30 h-20 w-32 -translate-x-1/2 -translate-y-[75%] transition-all duration-500 ${
                      isTouchActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex min-h-[150px] flex-col items-center justify-center text-center">

                    {/* Category Icon */}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F1ED] text-[#287C78] transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                      {CategoryIcon && (
                        <CategoryIcon
                          size={21}
                          strokeWidth={1.7}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-[#244B49]">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-[190px] text-xs leading-5 text-[#526D68]">
                      {category.description}
                    </p>

                  </div>

                  {/* Arrow - Separate from Text */}
                  <div className="pointer-events-none absolute bottom-3 right-3 z-20">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F1ED] text-[#287C78] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#287C78] group-hover:text-white group-active:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                </Link>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
