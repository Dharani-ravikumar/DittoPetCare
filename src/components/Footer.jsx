
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  PawPrint,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service/grooming-hygiene" },
  { name: "Our Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Grooming & Hygiene", href: "/service/grooming-hygiene" },
  { name: "Veterinary & Health", href: "/service/veterinary-health" },
  { name: "Boarding & Training", href: "/service/BoardingTraining" },
  { name: "Nutrition & Pet Spa", href: "/service/nutrition-pet-spa" },
];

const products = [
  { name: "Walking & Safety", href: "/products" },
  { name: "Feeding & Hydration", href: "/products/feeding-hydration" },
  { name: "Comfort & Sleep", href: "/products/comfort-sleep" },
  { name: "Clean & Care", href: "/products/clean-care" },
  { name: "Toys", href: "/products/toys" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Footer() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <footer className="relative isolate overflow-hidden bg-[#244B49] px-5 pt-12 text-white sm:px-8 sm:pt-16 lg:px-16">

      {/* Animated Decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[340px] w-[340px] rounded-full border-[42px] border-[#B8D9D1]/10 sm:-right-24 sm:-top-44 sm:h-[420px] sm:w-[420px]"
      />

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-8 top-0 -z-10 h-48 w-48 rounded-full bg-[#B8D9D1]/10 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-36 top-10 -z-10 h-20 w-20 rounded-full bg-[#B8D9D1]/10 blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-x-5 gap-y-9 pb-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-5 lg:gap-8 lg:pb-12"
        >

          {/* Brand - Full Width on Mobile */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 lg:col-span-1"
          >
            <Link
              href="/#home"
              className="mb-4 inline-flex items-center gap-2"
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B8D9D1] text-[#244B49]"
              >
                <PawPrint size={22} />
              </motion.span>

              <span className="text-xl font-bold tracking-tight">
                Ditto<span className="text-[#B8D9D1]">PetCare</span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-6 text-[#D5E5DF]">
              Caring for your furry family with love, comfort and quality.
              Everything your pet needs, all in one place.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="min-w-0">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-xs text-[#D5E5DF] transition-colors duration-300 hover:text-[#B8D9D1]"
                  >
                    {link.name}

                    <ArrowUpRight
                      size={12}
                      className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="min-w-0">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    scroll={true}
                    className="group inline-flex items-start gap-1 text-xs leading-5 text-[#D5E5DF] transition-all duration-300 hover:translate-x-1 hover:text-[#B8D9D1]"
                  >
                    <span>{service.name}</span>

                    <ArrowUpRight
                      size={12}
                      className="mt-0.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants} className="min-w-0">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Our Products
            </h3>

            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    scroll={true}
                    className="group inline-flex items-start gap-1 text-xs leading-5 text-[#D5E5DF] transition-all duration-300 hover:translate-x-1 hover:text-[#B8D9D1]"
                  >
                    <span>{product.name}</span>

                    <ArrowUpRight
                      size={12}
                      className="mt-0.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="min-w-0">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-4 text-xs text-[#D5E5DF]">

             

              <li className="flex items-start gap-2">
                <Phone
                  size={15}
                  className="mt-0.5 shrink-0 text-[#B8D9D1]"
                />
                <a
                  href="tel:8610093520"
                  className="transition-colors hover:text-[#B8D9D1]"
                >
                  8610093520
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-[#B8D9D1]"
                />
                <span className="leading-5">
                  New Street, Near Salembridge, Salem
                </span>
              </li>
            </ul>

          
{/* <p className="mt-4 text-xs leading-5 text-[#B8D9D1]">
  Have questions about your pet?{" "}
  <Link
    href="/contact"
    className="font-semibold text-xs  transition-colors hover:text-[#B8D9D1]"
  >
    We'd love to hear from you!
  </Link>
</p> */}

          </motion.div>

        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-white/15 py-6"
        >
          <p className="text-center text-[11px] text-[#D5E5DF]">
            © {new Date().getFullYear()} DittoPetCare. All rights reserved.
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-[#D5E5DF]">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-[#B8D9D1]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[#B8D9D1]"
            >
              Terms & Conditions
            </Link>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
