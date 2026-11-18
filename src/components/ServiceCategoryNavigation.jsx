
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PawPrint,
  Scissors,
  Salad,
  Home,
  Stethoscope,
} from "lucide-react";

const categories = [
  {
    title: "All",
    href: "/service/all",
    icon: PawPrint,
  },
  {
    title: "Grooming & Styling",
    href: "/service/grooming-hygiene",
    icon: Scissors,
  },
  {
    title: "Nutrition & Pet Spa",
    href: "/service/nutrition-pet-spa",
    icon: Salad,
  },
  {
    title: "Boarding & Training",
    href: "/service/BoardingTraining",
    icon: Home,
  },
  {
    title: "Veterinary & Health",
    href: "/service/veterinary-health",
    icon: Stethoscope,
  },
];

export default function ServiceCategoryNavigation({
  activeCategory,
}) {
  return (
    <section className="px-4 pb-6 sm:px-7 lg:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.title;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                href={category.href}
                className={`flex min-h-[43px] items-center justify-center gap-1.5 rounded-lg border px-2 py-2 transition duration-300 sm:min-h-[48px] sm:rounded-xl ${
                  isActive
                    ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
                    : "border-[#DCE9E5] bg-white text-[#244B49] hover:border-[#287C78] hover:bg-[#DDEFEA]"
                }`}
              >
                <Icon
                  size={13}
                  className={
                    isActive
                      ? "shrink-0 text-white"
                      : "shrink-0 text-[#287C78]"
                  }
                />

                <span className="text-[9px] font-semibold leading-3 sm:text-[10px]">
                  {category.title}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
