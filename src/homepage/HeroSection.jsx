"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PawPrint, Heart } from "lucide-react";

const heroImages = [
   {
    src: "/images/homepages/care.jpeg",
    alt: "Happy Jack Russell dog",
  },
  {
    src: "/images/homepages/hair.jpeg",
    alt: "Happy Jack Russell dog",
  },
     {
    src: "/images/homepages/cute.jpeg",
    alt: "Cute happy cat",
  },
  {
    src: "/images/homepages/dog.jpeg",
    alt: "Happy Jack Russell dog",
  },
  {
    src: "/images/homepages/bcat.jpeg",
    alt: "Cute happy cat",
  },

];

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);

  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#FAF7EE] px-5 pt-0 pb-8 sm:px-8 sm:pt-1 sm:pb-10 lg:pt-1 lg:pb-12"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B8D9D1]/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#E8E1CC]/50 blur-3xl" />

      {/* Main layout */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-8">

        {/* Text - second on mobile, LEFT on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 order-2 w-full text-center lg:order-1 lg:w-1/2 lg:text-left"
        >
          {/* Animated small label */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8D9D1] bg-white/80 px-4 py-2 shadow-sm"
          >
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              <PawPrint size={16} className="text-[#287C78]" />
            </motion.span>

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#287C78]">
              Everything Your Pet Needs
            </span>

            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart size={13} className="fill-[#287C78] text-[#287C78]" />
            </motion.span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-[#244B49] sm:text-2xl lg:text-4xl">
            Happy Pets{" "}
            <span className="text-[#287C78]">
              Healthier Lives.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-xl text-xs leading-7 text-[#526D68] sm:mt-4 sm:text-sm lg:mx-0">
            From nutritious food and playful accessories to professional
            grooming and wellness care, we make every moment with your
            furry friend special.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#services"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#287C78] px-7 py-3 text-xs font-bold text-white shadow-xs shadow-[#287C78]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#244B49] hover:shadow-xl"
            >
              Explore Services

              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#287C78] px-7 py-3 text-xs font-bold text-[#287C78] transition duration-300 hover:-translate-y-1 hover:bg-[#E5F0EA]"
            >
              Shop Now
            </Link>
          </div>

          {/* Trust note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#526D68] lg:mt-7 lg:justify-start">
            <Heart size={16} className="fill-[#287C78] text-[#287C78]" />

            <span>
              Care, comfort and happiness for every pet.
            </span>
          </div>
        </motion.div>

        {/* Image - FIRST on mobile, RIGHT on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative order-1 mx-auto -mt-2 w-full max-w-lg lg:order-2 lg:mt-0 lg:w-1/2"
        >
          {/* Circular background */}
          <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8D9D1]/60 sm:h-[360px] sm:w-[360px] lg:h-[410px] lg:w-[410px]" />

          {/* Main circular image */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 mx-auto h-[250px] w-[250px] overflow-hidden rounded-full border-8 border-white shadow-xl sm:h-[360px] sm:w-[360px] lg:h-[410px] lg:w-[410px]"
          >
            {/* Automatic image slideshow */}
            {heroImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 h-full w-full rounded-full object-cover object-center transition-opacity duration-1000 ${
                  activeImage === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            ))}
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1 left-0 z-20 rounded-2xl border border-[#DCE9E5] bg-white p-3 shadow-xl sm:bottom-5 sm:left-2 sm:p-4"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F0EA] sm:h-11 sm:w-11">
                <Heart
                  size={20}
                  className="fill-[#287C78] text-[#287C78]"
                />
              </div>

              <div>
                <p className="text-xs font-extrabold text-[#244B49] sm:text-sm">
                  Made with Love
                </p>

                <p className="text-[10px] text-[#526D68] sm:text-xs">
                  For your furry family
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}