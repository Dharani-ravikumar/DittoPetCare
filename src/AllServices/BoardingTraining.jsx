
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  PawPrint,
  Home,
  Clock,
  GraduationCap,
  Heart,
  Bone,
  Sparkles,
  Filter,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryNavigation from "@/components/ServiceCategoryNavigation";

const boardingServices = [
  {
    title: "Comfortable Pet Boarding",
    description:
      "A safe, clean and comfortable stay for your pets while you are away.",
    image: "/images/services/traning/2.jpeg",
    category: "Boarding",
    slug: "comfortable-pet-boarding",
  },
  {
    title: "Daycare Services",
    description:
      "A fun and caring environment where pets can play and relax during the day.",
    image: "/images/services/traning/3.jpeg",
    category: "Boarding",
    slug: "daycare-services",
  },
  {
    title: "Basic Obedience Training",
    description:
      "Help your pet learn essential commands like sit, stay and come.",
    image: "/images/services/traning/4.jpeg",
    category: "Training",
    slug: "basic-obedience-training",
  },
  {
    title: "Playtime & Exercise",
    description:
      "Engaging activities and exercise to keep your pet active and happy.",
    image: "/images/services/traning/5.jpeg",
    category: "Training",
    slug: "playtime-exercise",
  },
];

const filters = ["All", "Boarding", "Training"];

export default function BoardingTraining() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredServices =
    activeFilter === "All"
      ? boardingServices
      : boardingServices.filter(
          (service) => service.category === activeFilter
        );

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#FAF7EE] text-[#244B49]">
        {/* HERO SECTION */}
        <section className="px-4 pb-7 pt-4 sm:px-7 sm:pb-9 sm:pt-5 lg:px-12">
          <div className="ml-0 grid max-w-6xl items-center gap-5 lg:grid-cols-[1.05fr_0.75fr] lg:gap-10">
            {/* HERO TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 mt-5 inline-flex items-center gap-2 rounded-full border border-[#DCE9E5] bg-white px-3 py-1">
                <PawPrint size={12} className="text-[#287C78]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#287C78]">
                  Boarding & Training
                </span>
              </div>

              <h1 className="max-w-xl text-[20px] font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[43px]">
                Happy Stays,
                <span className="block text-[#287C78]">
                  Better Behaviours.
                </span>
              </h1>

              <p className="mt-2 max-w-md text-[11px] leading-5 text-[#526D68] sm:text-xs sm:leading-6">
                From comfortable stays to positive training sessions,
                give your furry friend a safe, happy and caring
                environment to grow and learn.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="#boarding-services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#B8D9D1] px-4 py-2 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] sm:text-xs"
                >
                  Explore Services
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-[#526D68] sm:text-[10px]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Safe Environment
                </span>

                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Loving Care
                </span>

                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#287C78]" />
                  Positive Training
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
                    src="/images/services/traning/1.jpeg"
                    alt="Happy dog enjoying boarding and training"
                    className="h-[155px] w-full object-cover sm:h-[195px] lg:h-[220px]"
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
                      Happy Pets
                    </p>

                    <p className="text-[8px] text-[#526D68]">
                      Every day, every stay
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMMON CATEGORY NAVIGATION */}
        <ServiceCategoryNavigation activeCategory="Boarding & Training" />

        {/* BOARDING & TRAINING SERVICES */}
        <section
          id="boarding-services"
          className="scroll-mt-24 px-4 pb-12 sm:px-7 lg:px-12 lg:pb-16"
        >
          <div className="ml-0 max-w-6xl">
            {/* HEADING AND FILTERS */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-1.5 flex items-center gap-1.5 text-[#287C78]">
                  <Sparkles size={13} />

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                    Our Boarding & Training Services
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Happy Stays, Happy Learning.
                </h2>

                <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#526D68] sm:text-xs">
                  Caring boarding facilities and positive training
                  experiences to keep your pet comfortable, active
                  and confident.
                </p>
              </div>

              {/* FILTERS */}
              <div>
                <div className="mb-1.5 flex items-center gap-1 text-[9px] font-semibold text-[#526D68]">
                  <Filter size={11} />
                  Filter services
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-3.5 py-1.5 text-[9px] font-semibold transition sm:text-[10px] ${
                        activeFilter === filter
                          ? "bg-[#287C78] text-white"
                          : "border border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:text-[#287C78]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICE CARDS */}
            <motion.div
              layout
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
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
                        "Boarding & Training"
                      )}`}
                      className="group relative block min-h-[205px] overflow-hidden rounded-[17px] border border-[#DCE9E5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[215px]"
                    >
                      {/* CARD CONTENT */}
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                            {service.category === "Boarding" ? (
                              service.title === "Daycare Services" ? (
                                <Clock size={15} />
                              ) : (
                                <Home size={15} />
                              )
                            ) : service.title === "Basic Obedience Training" ? (
                              <GraduationCap size={15} />
                            ) : service.title === "Playtime & Exercise" ? (
                              <Bone size={15} />
                            ) : (
                              <PawPrint size={15} />
                            )}
                          </div>

                          <span className="rounded-full bg-[#DDEFEA] px-2.5 py-1 text-[8px] font-semibold text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                            {service.category}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-[#244B49] transition group-hover:text-white">
                          {service.title}
                        </h3>

                        <p className="mt-1.5 text-[10px] leading-5 text-[#526D68] transition group-hover:text-white/90">
                          {service.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-[#287C78] transition group-hover:text-white">
                            Explore service
                          </span>

                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white">
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>

                      {/* IMAGE OVERLAY */}
                      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#163F3C]/95 via-[#163F3C]/65 to-[#163F3C]/25" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredServices.length === 0 && (
              <p className="py-10 text-center text-xs text-[#526D68]">
                No services found in this category.
              </p>
            )}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 pb-10 sm:px-7 lg:px-12 lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ml-0 flex max-w-6xl flex-col items-center justify-between gap-3 rounded-[20px] bg-[#244B49] px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left"
          >
            <div>
              <div className="mb-1 flex items-center justify-center gap-1.5 text-[#B8D9D1] sm:justify-start">
                <PawPrint size={13} />

                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                  A Little Extra Love
                </span>
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Your Pet Deserves a Happy Stay.
              </h2>

              <p className="mt-1 text-[10px] leading-5 text-white/70 sm:text-xs">
                Give your furry friend a comfortable stay and a
                positive learning experience.
              </p>
            </div>

            <Link
              href="/booking?service=Boarding%20%26%20Training"
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
