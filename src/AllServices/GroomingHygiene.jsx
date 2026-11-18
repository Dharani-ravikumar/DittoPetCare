





"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  PawPrint,
  Scissors,
  Sparkles,
  Heart,
  Filter,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategoryNavigation from "@/components/ServiceCategoryNavigation";

const groomingServices = [
  {
    title: "Bathing & Blow-drying",
    slug: "bathing-blow-drying",
    description:
      "A refreshing bath with gentle, pet-friendly products, followed by a comfortable blow-dry.",
    image: "/images/services/grooming/2.jpeg",
    category: "Hygiene",
  },
  {
    title: "Haircuts & Styling",
    slug: "haircuts-styling",
    description:
      "Neat haircuts and stylish trims designed around your pet's comfort and personality.",
    image: "/images/services/grooming/3.jpeg",
    category: "Grooming",
  },
  {
    title: "Nail Care",
    slug: "nail-care",
    description:
      "Careful nail trimming to keep your pet comfortable while walking and playing.",
    image: "/images/services/grooming/4.jpeg",
    category: "Grooming",
  },
  {
    title: "Ear & Eye Cleaning",
    slug: "ear-eye-cleaning",
    description:
      "Gentle cleaning to help keep your pet's ears and eyes fresh and comfortable.",
    image: "/images/services/grooming/5.jpeg",
    category: "Hygiene",
  },
  {
    title: "Dematting & Deshedding",
    slug: "dematting-deshedding",
    description:
      "Remove loose fur and tangles while keeping your pet's coat soft and healthy.",
    image: "/images/services/grooming/6.jpeg",
    category: "Grooming",
  },
  {
    title: "Teeth Brushing & Mouthwash",
    slug: "teeth-brushing-mouthwash",
    description:
      "Gentle oral care to support fresh breath and better everyday dental hygiene.",
    image: "/images/services/grooming/7.jpeg",
    category: "Hygiene",
  },
];

const filters = ["All", "Grooming", "Hygiene"];

export default function GroomingHygiene() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredServices =
    activeFilter === "All"
      ? groomingServices
      : groomingServices.filter(
          (service) => service.category === activeFilter
        );

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
                  Grooming & Hygiene
                </span>
              </div>

              <h1 className="max-w-xl text-[20px] font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[43px]">
                A Little Pampering
                <span className="block text-[#287C78]">
                  Goes a Long Way.
                </span>
              </h1>

              <p className="mt-2 max-w-md text-[11px] leading-5 text-[#526D68] sm:text-xs sm:leading-6">
                From refreshing baths to stylish haircuts, give your furry
                friend the care, comfort, and attention they deserve.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="#grooming-services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#B8D9D1] px-4 py-2 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] sm:text-xs"
                >
                  Explore Services
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-[#526D68] sm:text-[10px]">
                {[
                  "Gentle Care",
                  "Pet-friendly Products",
                  "Loving Attention",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-[#287C78]" />
                    {item}
                  </span>
                ))}
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
                    src="/images/services/grooming/1.jpeg"
                    alt="Pet grooming and styling"
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
                      Made with Love
                    </p>
                    <p className="text-[8px] text-[#526D68]">
                      Care in every touch
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMMON CATEGORY NAVIGATION */}
        <ServiceCategoryNavigation activeCategory="Grooming & Styling" />

        {/* GROOMING SERVICES */}
        <section
          id="grooming-services"
          className="scroll-mt-24 px-4 pb-12 sm:px-7 lg:px-12 lg:pb-16"
        >
          <div className="mx-auto max-w-6xl">
            {/* SECTION HEADING AND FILTERS */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-1.5 flex items-center gap-1.5 text-[#287C78]">
                  <Sparkles size={13} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                    Our Grooming Services
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Fresh Looks, Happy Pets.
                </h2>

                <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#526D68] sm:text-xs">
                  Thoughtful grooming and hygiene services to keep your pet
                  looking good and feeling their best.
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
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                  >
                    <Link
                      href={`/service-details/${service.slug}?category=${encodeURIComponent(
                        "Grooming & Hygiene"
                      )}`}
                      className="group relative block min-h-[205px] overflow-hidden rounded-[17px] border border-[#DCE9E5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[215px]"
                    >
                      {/* CARD CONTENT */}
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
                            {service.category === "Grooming" ? (
                              <Scissors size={15} />
                            ) : (
                              <Sparkles size={15} />
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
                Give your furry friend a fresh, happy, and comfortable experience.
              </p>
            </div>

            <Link
              href="/booking?service=Grooming%20%26%20Hygiene"
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


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   PawPrint,
//   Scissors,
//   Sparkles,
//   Heart,
//   Home,
//   Stethoscope,
//   Salad,
//   Filter,
//   CheckCircle2,
// } from "lucide-react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const groomingServices = [
//   {
//     title: "Bathing & Blow-drying",
//     description:
//       "A refreshing bath with gentle, pet-friendly products, followed by a comfortable blow-dry.",
//     image: "/images/services/grooming/2.jpeg",
//     category: "Hygiene",
//   },
//   {
//     title: "Haircuts & Styling",
//     description:
//       "Neat haircuts and stylish trims designed around your pet's comfort and personality.",
//     image: "/images/services/grooming/3.jpeg",
//     category: "Grooming",
//   },
//   {
//     title: "Nail Care",
//     description:
//       "Careful nail trimming to keep your pet comfortable while walking and playing.",
//     image: "/images/services/grooming/4.jpeg",
//     category: "Grooming",
//   },
//   {
//     title: "Ear & Eye Cleaning",
//     description:
//       "Gentle cleaning to help keep your pet's ears and eyes fresh and comfortable.",
//     image: "/images/services/grooming/5.jpeg",
//     category: "Hygiene",
//   },
//   {
//     title: "Dematting & Deshedding",
//     description:
//       "Remove loose fur and tangles while keeping your pet's coat soft and healthy.",
//     image: "/images/services/grooming/6.jpeg",
//     category: "Grooming",
//   },
//   {
//     title: "Teeth Brushing & Mouthwash",
//     description:
//       "Gentle oral care to support fresh breath and better everyday dental hygiene.",
//     image: "/images/services/grooming/7.jpeg",
//     category: "Hygiene",
//   },
// ];

// const categories = [
//   {
//     title: "Grooming & Styling",
//     href: "/service/grooming-hygiene",
//     icon: Scissors,
//     active: true,
//   },
//   {
//     title: "Nutrition & Pet Spa",
//     href: "/service/nutrition-pet-spa",
//     icon: Salad,
//   },
//   {
//     title: "Boarding & Training",
//     href: "/service/BoardingTraining",
//     icon: Home,
//   },
//   {
//     title: "Veterinary & Health",
//     href: "/service/veterinary-health",
//     icon: Stethoscope,
//   },
// ];

// const filters = ["All", "Grooming", "Hygiene"];

// export default function GroomingHygiene() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeCard, setActiveCard] = useState(null);

//   const filteredServices =
//     activeFilter === "All"
//       ? groomingServices
//       : groomingServices.filter(
//           (service) => service.category === activeFilter
//         );

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen overflow-hidden bg-[#FAF7EE] text-[#244B49]">

//         {/* HERO SECTION */}
//         <section className="px-4 pb-7 pt-4 sm:px-7 sm:pb-9 sm:pt-5 lg:px-12">
//           <div className="ml-0 grid max-w-6xl items-center gap-5 lg:grid-cols-[1.05fr_0.75fr] lg:gap-10">

//             {/* HERO TEXT */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="mb-2 mt-5 inline-flex items-center gap-2 rounded-full border border-[#DCE9E5] bg-white px-3 py-1">
//                 <PawPrint size={12} className="text-[#287C78]" />

//                 <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#287C78]">
//                   Grooming & Hygiene
//                 </span>
//               </div>

//               <h1 className="max-w-xl text-[20px] font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[43px]">
//                 A Little Pampering
//                 <span className="block text-[#287C78]">
//                   Goes a Long Way.
//                 </span>
//               </h1>

//               <p className="mt-2 max-w-md text-[11px] leading-5 text-[#526D68] sm:text-xs sm:leading-6">
//                 From refreshing baths to stylish haircuts, give your furry
//                 friend the care, comfort, and attention they deserve.
//               </p>

//               <div className="mt-3 flex flex-wrap gap-2">
//                 <a
//                   href="#grooming-services"
//                   className="inline-flex items-center gap-1.5 rounded-full border border-[#B8D9D1] px-4 py-2 text-[10px] font-semibold text-[#287C78] transition hover:bg-[#DDEFEA] sm:text-xs"
//                 >
//                   Explore Services
//                   <ArrowRight size={13} />
//                 </a>
//               </div>

//               <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-[#526D68] sm:text-[10px]">
//                 <span className="flex items-center gap-1">
//                   <CheckCircle2 size={11} className="text-[#287C78]" />
//                   Gentle Care
//                 </span>

//                 <span className="flex items-center gap-1">
//                   <CheckCircle2 size={11} className="text-[#287C78]" />
//                   Pet-friendly Products
//                 </span>

//                 <span className="flex items-center gap-1">
//                   <CheckCircle2 size={11} className="text-[#287C78]" />
//                   Loving Attention
//                 </span>
//               </div>
//             </motion.div>

//             {/* HERO IMAGE */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7 }}
//               className="mx-auto w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[340px]"
//             >
//               <div className="relative">
//                 <div className="overflow-hidden rounded-[22px] border-4 border-white shadow-lg">
//                   <img
//                     src="/images/services/grooming/1.jpeg"
//                     alt="Pet grooming and styling"
//                     className="h-[155px] w-full object-cover sm:h-[195px] lg:h-[220px]"
//                   />
//                 </div>

//                 <motion.div
//                   animate={{ y: [0, -4, 0] }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl border border-[#DCE9E5] bg-white px-3 py-2 shadow-md"
//                 >
//                   <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
//                     <Heart size={13} fill="currentColor" />
//                   </div>

//                   <div>
//                     <p className="text-[9px] font-bold text-[#244B49]">
//                       Made with Love
//                     </p>

//                     <p className="text-[8px] text-[#526D68]">
//                       Care in every touch
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* CATEGORY CARDS */}
//         <section className="px-4 pb-6 sm:px-7 lg:px-12">
//           <div className="ml-0 grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
//             {categories.map((category, index) => {
//               const Icon = category.icon;

//               return (
//                 <motion.div
//                   key={category.title}
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.06 }}
//                 >
//                   <Link
//                     href={category.href}
//                     className={`flex min-h-[43px] items-center justify-center gap-1.5 rounded-lg border px-2 py-2 transition duration-300 sm:min-h-[48px] sm:rounded-xl ${
//                       category.active
//                         ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
//                         : "border-[#DCE9E5] bg-white text-[#244B49] hover:border-[#287C78] hover:bg-[#DDEFEA]"
//                     }`}
//                   >
//                     <Icon
//                       size={13}
//                       className={
//                         category.active
//                           ? "shrink-0 text-white"
//                           : "shrink-0 text-[#287C78]"
//                       }
//                     />

//                     <span className="text-[9px] font-semibold leading-3 sm:text-[10px]">
//                       {category.title}
//                     </span>
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </section>

//         {/* GROOMING SERVICES */}
//         <section
//           id="grooming-services"
//           className="scroll-mt-24 px-4 pb-12 sm:px-7 lg:px-12 lg:pb-16"
//         >
//           <div className="ml-0 max-w-6xl">

//             {/* SECTION HEADING AND FILTERS */}
//             <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//               <div>
//                 <div className="mb-1.5 flex items-center gap-1.5 text-[#287C78]">
//                   <Sparkles size={13} />

//                   <span className="text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
//                     Our Grooming Services
//                   </span>
//                 </div>

//                 <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
//                   Fresh Looks, Happy Pets.
//                 </h2>

//                 <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#526D68] sm:text-xs">
//                   Thoughtful grooming and hygiene services to keep your pet
//                   looking good and feeling their best.
//                 </p>
//               </div>

//               {/* FILTERS */}
//               <div>
//                 <div className="mb-1.5 flex items-center gap-1 text-[9px] font-semibold text-[#526D68]">
//                   <Filter size={11} />
//                   Filter services
//                 </div>

//                 <div className="flex flex-wrap gap-1.5">
//                   {filters.map((filter) => (
//                     <button
//                       key={filter}
//                       onClick={() => {
//                         setActiveFilter(filter);
//                         setActiveCard(null);
//                       }}
//                       className={`rounded-full px-3.5 py-1.5 text-[9px] font-semibold transition sm:text-[10px] ${
//                         activeFilter === filter
//                           ? "bg-[#287C78] text-white"
//                           : "border border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:text-[#287C78]"
//                       }`}
//                     >
//                       {filter}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* SERVICE CARDS */}
//             <motion.div
//               layout
//               className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
//             >
//               <AnimatePresence mode="popLayout">
//                 {filteredServices.map((service, index) => {
//                   const isActive = activeCard === service.title;

//                   return (
//                     <motion.div
//                       layout
//                       key={service.title}
//                       initial={{ opacity: 0, y: 12 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.96 }}
//                       transition={{ duration: 0.25, delay: index * 0.03 }}
//                     >
//                       <Link
//                         href={`/booking?service=${encodeURIComponent(
//                           `Grooming & Hygiene - ${service.title}`
//                         )}`}
//                         onClick={(event) => {
//                           if (!isActive) {
//                             event.preventDefault();
//                             setActiveCard(service.title);
//                           }
//                         }}
//                         className="group relative block min-h-[205px] overflow-hidden rounded-[17px] border border-[#DCE9E5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[215px]"
//                       >
//                         <div className="relative z-10 flex h-full flex-col">
//                           <div className="mb-3 flex items-center justify-between">
//                             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
//                               {service.category === "Grooming" ? (
//                                 <Scissors size={15} />
//                               ) : (
//                                 <Sparkles size={15} />
//                               )}
//                             </div>

//                             <span className="rounded-full bg-[#DDEFEA] px-2.5 py-1 text-[8px] font-semibold text-[#287C78] transition group-hover:bg-white/20 group-hover:text-white">
//                               {service.category}
//                             </span>
//                           </div>

//                           <h3 className="text-sm font-bold text-[#244B49] transition group-hover:text-white">
//                             {service.title}
//                           </h3>

//                           <p className="mt-1.5 text-[10px] leading-5 text-[#526D68] transition group-hover:text-white/90">
//                             {service.description}
//                           </p>

//                           <div className="mt-3 flex items-center justify-between">
//                             <span className="text-[9px] font-bold text-[#287C78] transition group-hover:text-white">
//                               {isActive
//                                 ? "Book this service"
//                                 : "Explore service"}
//                             </span>

//                             <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78] transition group-hover:bg-white">
//                               <ArrowUpRight size={13} />
//                             </span>
//                           </div>
//                         </div>

//                         {/* IMAGE OVERLAY */}
//                         <div
//                           className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${
//                             isActive
//                               ? "opacity-100"
//                               : "opacity-0 group-hover:opacity-100"
//                           }`}
//                         >
//                           <img
//                             src={service.image}
//                             alt={service.title}
//                             className="h-full w-full object-cover"
//                           />

//                           <div className="absolute inset-0 bg-gradient-to-t from-[#163F3C]/95 via-[#163F3C]/65 to-[#163F3C]/25" />
//                         </div>
//                       </Link>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           </div>
//         </section>

//         {/* BOTTOM CTA */}
//         <section className="px-4 pb-10 sm:px-7 lg:px-12 lg:pb-14">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="ml-0 flex max-w-6xl flex-col items-center justify-between gap-3 rounded-[20px] bg-[#244B49] px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left"
//           >
//             <div>
//               <div className="mb-1 flex items-center justify-center gap-1.5 text-[#B8D9D1] sm:justify-start">
//                 <PawPrint size={13} />

//                 <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
//                   A Little Extra Love
//                 </span>
//               </div>

//               <h2 className="text-lg font-bold text-white sm:text-xl">
//                 Your Pet Deserves the Best Care.
//               </h2>

//               <p className="mt-1 text-[10px] leading-5 text-white/70 sm:text-xs">
//                 Give your furry friend a fresh, happy, and comfortable experience.
//               </p>
//             </div>

//             <Link
//               href="/booking?service=Grooming%20%26%20Hygiene"
//               className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#B8D9D1] px-4 py-2.5 text-[10px] font-bold text-[#244B49] transition hover:bg-white sm:text-xs"
//             >
//               Book Your Visit
//               <ArrowRight size={13} />
//             </Link>
//           </motion.div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }
