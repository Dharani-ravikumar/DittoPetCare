
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#FAF7EE] px-5 py-16 sm:px-8 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 lg:gap-16">

        {/* About Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-[40px] bg-[#B8D9D1]" />

          <div className="relative overflow-hidden rounded-[35px]">
            <img
              src="/images/homepages/catdog.jpeg"
              alt="Happy pets at DittoPetCare"
              className="h-[330px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[390px]"
            />
          </div>

          <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg">
            <Heart size={20} className="fill-[#287C78] text-[#287C78]" />
            <span className="text-xs font-semibold text-[#244B49]">
              Care with Love
            </span>
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#287C78]">
            About DittoPetCare
          </p>

          <h2 className="text-2xl font-bold leading-snug text-[#244B49] sm:text-3xl lg:text-4xl">
            Every Pet Deserves
            <span className="text-[#287C78]"> a Little Extra Love.</span>
          </h2>

          <p className="mt-5 text-xs leading-7 text-[#526D68] sm:text-sm">
            At DittoPetCare, we believe pets are family. From everyday
            essentials to professional grooming and wellness services,
            we bring everything your furry friends need under one roof.
          </p>

          <p className="mt-3 text-xs leading-7 text-[#526D68] sm:text-sm">
            Our goal is simple — to make every pet feel happy, healthy
            and loved, every single day.
          </p>

          <a
            href="/about"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#287C78] px-6 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#244B49] hover:shadow-lg"
          >
            Know More 
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

      </div>
    </section> 
  );
}
