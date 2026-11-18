
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  Syringe,
  Stethoscope,
  Activity,
  PawPrint,
  Sparkles,
  Heart,
  Eye,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryNavigation from "@/components/ServiceCategoryNavigation";

const veterinaryServices = [
  {
    title: "General Health Checkups",
    slug: "general-health-checkups",
    description:
      "Regular physical examinations to monitor your pet's overall health, identify concerns and support a healthy lifestyle.",
    icon: Stethoscope,
    image: "/images/services/veterinary/2.jpeg",
  },
  {
    title: "Vaccination Services",
    slug: "vaccination-services",
    description:
      "Essential vaccinations to help protect dogs and cats against common infectious diseases based on veterinary recommendations.",
    icon: Syringe,
    image: "/images/services/veterinary/3.jpeg",
  },
  {
    title: "Dental Health Checkups",
    slug: "dental-health-checkups",
    description:
      "Oral examinations to check teeth and gums, identify dental concerns and maintain your pet's oral health.",
    icon: HeartPulse,
    image: "/images/services/veterinary/4.jpeg",
  },
  {
    title: "Eye & Ear Checkups",
    slug: "eye-ear-checkups",
    description:
      "Routine examinations to identify signs of eye irritation, ear infections and other common health concerns.",
    icon: Eye,
    image: "/images/services/veterinary/5.jpeg",
  },
  {
    title: "Health Monitoring",
    slug: "health-monitoring",
    description:
      "Regular monitoring of weight, temperature, activity and other important health indicators.",
    icon: Activity,
    image: "/images/services/veterinary/6.jpeg",
  },
  {
    title: "Emergency Veterinary Support",
    slug: "emergency-veterinary-support",
    description:
      "Guidance to help you find appropriate veterinary assistance when your pet needs urgent medical attention.",
    icon: Heart,
    image: "/images/services/veterinary/7.jpeg",
  },
];

export default function VeterinaryHealthPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#FAF7EE] text-[#244B49]">

        {/* HERO SECTION */}
        <section className="px-4 pb-7 pt-4 sm:px-7 sm:pb-9 sm:pt-5 lg:px-12">
          <div className="mx-auto grid max-w-6xl items-center gap-5 lg:grid-cols-[1.05fr_0.75fr] lg:gap-10">

            {/* HERO TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 mt-5 inline-flex items-center gap-2 rounded-full border border-[#DCE9E5] bg-white px-3 py-1">
                <PawPrint size={12} className="text-[#287C78]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#287C78]">
                  Veterinary & Health
                </span>
              </div>

              <h1 className="max-w-xl text-[20px] font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[43px]">
                Healthy Pets,
                <span className="block text-[#287C78]">
                  Happier Lives.
                </span>
              </h1>

              <p className="mt-2 max-w-md text-[11px] leading-5 text-[#526D68] sm:text-xs sm:leading-6">
                Your pet's health means everything. From regular health
                checkups to vaccinations and preventive care, we are here
                to support your furry friend's wellbeing at every stage.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="#veterinary-services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#B8D9D1] px-4 py-2 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] sm:text-xs"
                >
                  Explore Services
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-[#526D68] sm:text-[10px]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Expert Attention
                </span>

                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Preventive Care
                </span>

                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Loving Support
                </span>
              </div>
            </motion.div>

            {/* HERO IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[340px]"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-[22px] border-4 border-white shadow-lg">
                  <img
                    src="/images/services/veterinary/1.jpeg"
                    alt="Veterinarian caring for a dog"
                    className="h-[155px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[195px] lg:h-[220px]"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl border border-[#DCE9E5] bg-white px-3 py-2 shadow-md"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                    <Heart size={13} fill="currentColor" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold text-[#244B49]">
                      Healthy & Happy
                    </p>

                    <p className="text-[8px] text-[#526D68]">
                      Every paw matters
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMMON CATEGORY NAVIGATION */}
        <ServiceCategoryNavigation activeCategory="Veterinary & Health" />

        {/* VETERINARY SERVICES */}
        <section
          id="veterinary-services"
          className="scroll-mt-24 px-4 pb-12 sm:px-7 lg:px-12 lg:pb-16"
        >
          <div className="mx-auto max-w-6xl">

            {/* SECTION HEADING */}
            <div className="mb-5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[#287C78]">
                <Sparkles size={13} />

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                  Our Veterinary Services
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Complete Care for Your Pet's Health.
              </h2>

              <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#526D68] sm:text-xs">
                From routine health checkups to preventive treatments,
                explore our services designed to support your pet's
                health and happiness.
              </p>
            </div>

            {/* SERVICE CARDS */}
            <motion.div
              layout
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {veterinaryServices.map((service, index) => {
                  const ServiceIcon = service.icon;

                  return (
                    <motion.div
                      layout
                      key={service.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.03,
                      }}
                    >
                      <Link
                        href={`/service-details/${service.slug}?category=${encodeURIComponent(
                          "Veterinary & Health"
                        )}`}
                        className="group relative block min-h-[205px] overflow-hidden rounded-[17px] border border-[#DCE9E5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[215px]"
                      >
                        <div className="relative z-10 flex h-full flex-col">

                          {/* ICON AND CATEGORY */}
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                              <ServiceIcon size={15} />
                            </div>

                            <span className="rounded-full bg-[#DDEFEA] px-2.5 py-1 text-[8px] font-semibold text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                              Veterinary Care
                            </span>
                          </div>

                          {/* TITLE */}
                          <h3 className="text-sm font-bold text-[#244B49] transition group-hover:text-white">
                            {service.title}
                          </h3>

                          {/* DESCRIPTION */}
                          <p className="mt-1.5 text-[10px] leading-5 text-[#526D68] transition group-hover:text-white/90">
                            {service.description}
                          </p>

                          {/* ACTION */}
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-[#287C78] transition group-hover:text-white">
                              View Service Details
                            </span>

                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78] transition group-hover:rotate-45 group-hover:bg-white">
                              <ArrowUpRight size={13} />
                            </span>
                          </div>
                        </div>

                        {/* IMAGE OVERLAY */}
                        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#163F3C]/95 via-[#163F3C]/65 to-[#163F3C]/25" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 pb-10 sm:px-7 lg:px-12 lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-[20px] bg-[#244B49] px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left"
          >
            <div>
              <div className="mb-1 flex items-center justify-center gap-1.5 text-[#B8D9D1] sm:justify-start">
                <PawPrint size={13} />

                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                  A Little Extra Love
                </span>
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Your Pet's Health Comes First.
              </h2>

              <p className="mt-1 text-[10px] leading-5 text-white/70 sm:text-xs">
                Give your furry friend the attention and healthcare they deserve.
              </p>
            </div>

            <Link
              href="/booking?service=Veterinary%20%26%20Health"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#B8D9D1] px-4 py-2.5 text-[10px] font-bold text-[#244B49] transition hover:bg-white sm:text-xs"
            >
              Book Your Visit
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
