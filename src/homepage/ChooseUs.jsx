
"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    title: "Complete Pet Care",
    description:
      "From everyday essentials to grooming and wellness services, everything in one place.",
    icon: Heart,
  },
  {
    title: "Quality Products",
    description:
      "Explore carefully selected products to support your pet's everyday needs.",
    icon: ShieldCheck,
  },
  {
    title: "Care with Love",
    description:
      "We believe every pet deserves comfort, kindness and a little extra love.",
    icon: Sparkles,
  },
  {
    title: "Easy & Convenient",
    description:
      "Discover products and services with a simple and comfortable experience.",
    icon: ShoppingBag,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FAF7EE] px-5 py-16 sm:px-8 lg:px-16">
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
            Why Choose Us
          </p>

          <h2 className="text-2xl font-bold text-[#244B49] sm:text-3xl">
            Because Your Pets Deserve the Best
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#526D68]">
            More than just pet care, we make every little moment special
            for your furry family members.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const ReasonIcon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-[#DCE9E5] bg-white p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#287C78]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(40,124,120,0.15)]"
              >
                {/* Decorative Corner */}
                {/* <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#DDEFEA] transition-all duration-500 group-hover:scale-0" /> */}

                {/* Icon */}
                <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F1ED] text-[#287C78] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#287C78] group-hover:text-white">
                  <ReasonIcon size={25} strokeWidth={1.7} />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-[#244B49]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#526D68]">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
