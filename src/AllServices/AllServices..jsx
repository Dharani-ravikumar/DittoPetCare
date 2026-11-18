
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  PawPrint,
  Scissors,
  Salad,
  Home,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bone,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryNavigation from "@/components/ServiceCategoryNavigation";
import { allServices } from "@/data/allServices";

const ITEMS_PER_PAGE = 6;

export default function AllServices() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allServices.length / ITEMS_PER_PAGE);

  const displayedServices = allServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    setTimeout(() => {
      document
        .getElementById("all-services")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const getServiceIcon = (category) => {
    if (category === "Grooming") return Scissors;
    if (category === "Nutrition" || category === "Pet Spa") return Salad;
    if (category === "Boarding" || category === "Training") return Home;
    if (category === "Veterinary Care") return Stethoscope;
    return PawPrint;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#FAF7EE] text-[#244B49]">
        {/* PAGE INTRODUCTION */}
        <section className="px-4 pb-5 pt-8 sm:px-7 sm:pb-7 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto grid max-w-6xl items-center gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
          >
            {/* LEFT CONTENT - ORIGINAL DESIGN */}
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#DCE9E5] bg-white px-3 py-1">
                <PawPrint size={12} className="text-[#287C78]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#287C78]">
                  Complete Pet Care
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-[43px]">
                All Our Pet Care Services
                <span className="block text-[#287C78]">
                  Everything Your Pet Needs.
                </span>
              </h1>

              <p className="mt-2 max-w-xl text-[11px] leading-5 text-[#526D68] sm:text-xs sm:leading-6">
                Explore our complete range of grooming, nutrition, boarding,
                training and veterinary services. Find the right care for your
                furry companion.
              </p>
            </div>

            {/* RIGHT SIDE - IMAGE AND FLOATING ICONS */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto flex h-[220px] w-full max-w-[430px] items-center justify-center sm:h-[255px] lg:h-[270px]"
            >
              {/* BACKGROUND DECORATION */}
              <div className="absolute right-5 top-3 h-44 w-44 rounded-full bg-[#DDEFE8] blur-2xl sm:h-52 sm:w-52" />

              <div className="absolute bottom-3 left-8 h-24 w-24 rounded-full bg-[#F0E7D5] blur-2xl" />

              {/* MAIN IMAGE */}
              <div className="relative z-10 h-[180px] w-[76%] overflow-hidden rounded-[30px] border-[5px] border-white bg-[#EAF4EF] shadow-xl sm:h-[220px] lg:h-[235px]">
                <img
                  src="\images\services\all2.jpg"
                  alt="Professional pet care and grooming"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#163F3C]/50 via-transparent to-transparent" />

                {/* IMAGE CAPTION */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/40 bg-white/90 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#287C78]">
                    Complete Pet Care
                  </p>
                  <p className="text-[11px] font-bold text-[#244B49] sm:text-xs">
                    Happy Pets, Healthy Lives
                  </p>
                </div>
              </div>

              {/* GROOMING ICON */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1 top-8 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE9E5] bg-white text-[#287C78] shadow-lg sm:left-0 sm:h-12 sm:w-12"
              >
                <Scissors size={20} />
              </motion.div>

              {/* VETERINARY ICON */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-9 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE9E5] bg-white text-[#287C78] shadow-lg sm:h-12 sm:w-12"
              >
                <Stethoscope size={20} />
              </motion.div>

              {/* NUTRITION ICON */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-7 left-0 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE9E5] bg-white text-[#287C78] shadow-lg sm:h-12 sm:w-12"
              >
                <Bone size={20} />
              </motion.div>

              {/* BOARDING ICON */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 3.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-5 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE9E5] bg-white text-[#287C78] shadow-lg sm:h-12 sm:w-12"
              >
                <Home size={20} />
              </motion.div>

              {/* TRUST BADGE */}
              <div className="absolute left-10 top-0 z-20 flex items-center gap-1.5 rounded-full border border-[#DCE9E5] bg-white px-3 py-2 text-[8px] font-semibold text-[#287C78] shadow-md sm:left-14">
                <ShieldCheck size={12} />
                Care You Can Trust
              </div>

              {/* PAW DECORATION */}
              <div className="absolute bottom-0 right-12 z-20 flex h-8 w-8 rotate-12 items-center justify-center rounded-full bg-[#287C78] text-white shadow-md sm:right-16">
                <PawPrint size={15} />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* COMMON CATEGORY NAVIGATION */}
        <section className="pb-3">
          <ServiceCategoryNavigation activeCategory="All" />
        </section>

        {/* ALL SERVICES */}
        <section
          id="all-services"
          className="scroll-mt-24 px-4 pb-12 sm:px-7 lg:px-12 lg:pb-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[#287C78]">
                <Sparkles size={13} />
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                  Explore Our Services
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Care for Every Paw.
              </h2>

              <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#526D68] sm:text-xs">
                Browse all our services in one place. Select a service to
                learn more about the care we provide.
              </p>
            </div>

            {/* SERVICE CARDS */}
            <motion.div
              layout
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {displayedServices.map((service, index) => {
                  const ServiceIcon = getServiceIcon(service.category);

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
                          service.categoryName
                        )}`}
                        className="group relative block min-h-[205px] overflow-hidden rounded-[17px] border border-[#DCE9E5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[215px]"
                      >
                        <div className="relative z-10 flex h-full flex-col">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                              <ServiceIcon size={15} />
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
                              View Service Details
                            </span>

                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78] transition group-hover:rotate-45 group-hover:bg-white">
                              <ArrowUpRight size={13} />
                            </span>
                          </div>
                        </div>

                        {/* HOVER IMAGE */}
                        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <img
                            src={service.image}
                            alt={service.title}
                            loading="lazy"
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

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-8 items-center gap-1 rounded-full border border-[#DCE9E5] bg-white px-3 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={13} />
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => changePage(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold transition ${
                      currentPage === page
                        ? "bg-[#287C78] text-white"
                        : "border border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:text-[#287C78]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-8 items-center gap-1 rounded-full border border-[#DCE9E5] bg-white px-3 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={13} />
                </button>
              </div>
            )}

            <p className="mt-3 text-center text-[9px] text-[#526D68]">
              Showing {displayedServices.length} of {allServices.length} services
            </p>
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
                Your Pet Deserves the Best Care.
              </h2>

              <p className="mt-1 text-[10px] leading-5 text-white/70 sm:text-xs">
                Choose the right service and give your furry friend the care
                they deserve.
              </p>
            </div>

            <Link
              href="/booking"
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
