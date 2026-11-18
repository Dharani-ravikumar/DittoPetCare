
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  HeartPulse,
  ShieldCheck,
  Utensils,
  Stethoscope,
  ArrowRight,
  PawPrint,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const careSections = [
  {
    title: "Healthy Pets, Strong Protectors",
    category: "Health & Wellness",
    tag: "A stronger, healthier life",
    description:
      "A healthy pet has the energy and strength to stay active and alert. Proper care helps your pet stay healthy and become a confident companion at home.",
    image: "/images/h.jpg",
    icon: HeartPulse,
    link: "/service/grooming-hygiene",
  },
  {
    title: "Training Builds Good Behaviour",
    category: "Good Habits & Guidance",
    tag: "Building trust through training",
    description:
      "Positive training helps pets understand commands, develop good habits and respond appropriately to everyday situations. It also builds a stronger bond with their owners.",
    image: "/images/good.jpg",
    icon: ShieldCheck,
    link: "/service/boarding-training",
  },
  {
    title: "Proper Nutrition",
    category: "Food & Nutrition",
    tag: "Healthy food, happy pets",
    description:
      "Nutritious food provides the essential nutrients pets need for healthy growth, strong bodies, energy and overall wellbeing.",
    image: "/images/n.jpg",
    icon: Utensils,
    link: "/service/nutrition-pet-spa",
  },
  {
    title: "Regular Health Checkups",
    category: "Veterinary Care",
    tag: "Prevention is better than cure",
    description:
      "Routine veterinary visits help identify health problems early, monitor your pet's wellbeing and protect them from preventable illnesses.",
    image: "/images/v.jpg",
    icon: Stethoscope,
    link: "/service/veterinary-health",
  },
];

export default function WhyPetCareMattersPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // AUTOMATIC CARD ROTATION - EVERY 3 SECONDS
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % careSections.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextCard = () => {
    setActiveIndex((current) => (current + 1) % careSections.length);
  };

  const previousCard = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + careSections.length) % careSections.length
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#FAF8EF]">
        {/* ================= TOP INTRODUCTION ================= */}

        <section className="px-5 pb-8 pt-10 sm:pb-12 sm:pt-14">
          <div className="mx-auto grid max-w-6xl items-center gap-7 md:grid-cols-[1.15fr_0.85fr] md:gap-12">

            {/* LEFT INTRODUCTION CONTENT */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-left"
            >
              <div className="mb-4 flex items-center gap-2 text-[#287C78]">
                <Sparkles size={15} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Responsible Pet Parenting
                </span>
              </div>

              <h1 className="max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-[#205B56] sm:text-3xl md:text-4xl">
                Love Them, Care for Them, Train Them
              </h1>

              <p className="mt-4 max-w-xl text-xs leading-7 text-[#52736D] sm:text-sm">
                Pets are our companions and family members. Some may also
                help protect our homes. Giving them proper health care,
                nutritious food and positive training helps them live a
                healthier and happier life.
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 65 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-5 h-[3px] rounded-full bg-[#287C78]"
              />

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#C9DFD8] bg-[#E8F2EC] px-3 py-1.5 text-[10px] font-semibold text-[#287C78]">
                  <HeartPulse size={12} className="mr-1 inline" />
                  Good Health
                </span>

                <span className="rounded-full border border-[#C9DFD8] bg-[#E8F2EC] px-3 py-1.5 text-[10px] font-semibold text-[#287C78]">
                  <ShieldCheck size={12} className="mr-1 inline" />
                  Positive Training
                </span>

                <span className="rounded-full border border-[#C9DFD8] bg-[#E8F2EC] px-3 py-1.5 text-[10px] font-semibold text-[#287C78]">
                  <Utensils size={12} className="mr-1 inline" />
                  Proper Nutrition
                </span>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-md md:mx-0"
            >
              <div className="relative h-[230px] overflow-hidden rounded-[26px] border border-[#D5E8E2] bg-[#E4F0EA] shadow-lg sm:h-[290px]">
                <motion.img
                  src="/images/pet.jpg"
                  alt="A happy and healthy pet"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#174F4B]/45 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/40 bg-[#FAF8EF]/95 px-3 py-2 text-[#246E68] shadow-md">
                  <Heart size={14} />
                  <span className="text-[10px] font-bold">
                    Every Pet Deserves Love
                  </span>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-3 -top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D5E8E2] bg-[#FAF8EF] text-[#287C78] shadow-md sm:-right-4 sm:h-14 sm:w-14"
              >
                <PawPrint size={25} />
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ================= THREE CARD CAROUSEL ================= */}

        <section className="px-0 pb-12 pt-5 sm:pb-16">
          <div className="mx-auto max-w-6xl">

            {/* CAROUSEL */}

            <div
              className="relative mx-auto h-[390px] w-full overflow-hidden sm:h-[365px] md:h-[355px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {careSections.map((item, index) => {
                const Icon = item.icon;

                const position =
                  (index - activeIndex + careSections.length) %
                  careSections.length;

                const isCenter = position === 0;
                const isRight = position === 1;
                const isLeft = position === careSections.length - 1;
                const isVisible = isCenter || isLeft || isRight;

                let x = "112%";

                if (isCenter) x = "0%";
                if (isLeft) x = "-112%";

                return (
                  <motion.article
                    key={item.title}
                    initial={false}
                    animate={{
                      x,
                      scale: isCenter ? 1 : 0.83,
                      opacity: isCenter ? 1 : isVisible ? 0.48 : 0,
                      rotateY: isCenter ? 0 : isLeft ? 9 : -9,
                      zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      left: "50%",
                      top: "12px",
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                    className="absolute h-[350px] w-[94%] max-w-[570px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#C9DFD8] bg-[#FAF8EF] shadow-xl sm:h-[310px] sm:w-[82%] md:h-[310px] md:w-[62%]"
                  >
                    <div className="flex h-full flex-row">

                      {/* LEFT CONTENT */}

                      <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-5">

                        {/* CATEGORY LABEL WITH ICON */}

                        <div className="-mt-10 mb-3 flex w-fit items-center gap-1.5 rounded-full border border-[#C9DFD8] bg-[#E8F2EC] px-2.5 py-1.5">
                          <motion.span
                            animate={
                              isCenter
                                ? { scale: [1, 1.12, 1] }
                                : { scale: 1 }
                            }
                            transition={{
                              duration: 2,
                              repeat: isCenter ? Infinity : 0,
                            }}
                            className="flex shrink-0 items-center justify-center text-[#287C78]"
                          >
                            <Icon size={13} />
                          </motion.span>

                          <span className="text-[9px] font-bold tracking-wide text-[#287C78]">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="mt-2 text-sm font-extrabold leading-5 text-[#205B56] sm:text-base sm:leading-6">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-[10px] font-semibold text-[#287C78]">
                          {item.tag}
                        </p>

                        <p className="mt-3 text-[10px] leading-[1.65] text-[#52736D] sm:text-xs">
                          {item.description}
                        </p>

                        <Link
                          href={item.link || "/service"}
                          className="mt-4 inline-flex w-fit items-center gap-1.5 text-[9px] font-semibold text-[#287C78] transition hover:text-[#205B56] hover:underline"
                        >
                          <Heart size={12} />
                          Care that makes a difference
                          <ArrowRight size={11} />
                        </Link>
                      </div>

                      {/* RIGHT IMAGE */}

                      <div className="relative h-full w-[43%] shrink-0 overflow-hidden bg-[#E2EFE9] sm:w-[40%]">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          animate={
                            isCenter
                              ? { scale: [1, 1.04, 1] }
                              : { scale: 1 }
                          }
                          transition={{
                            duration: 5,
                            repeat: isCenter ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#205B56]/10" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* CAROUSEL CONTROLS */}

            <div className="relative z-40 mt-2 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={previousCard}
                aria-label="Previous card"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9DFD8] bg-[#FAF8EF] text-[#287C78] shadow-sm transition hover:bg-[#E2EFE9]"
              >
                <ChevronLeft size={18} />
              </button>

              {/* DOTS */}

              <div className="flex items-center gap-2">
                {careSections.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${item.title}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "w-7 bg-[#287C78]"
                        : "w-2 bg-[#B8D2C9] hover:bg-[#287C78]/60"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextCard}
                aria-label="Next card"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9DFD8] bg-[#FAF8EF] text-[#287C78] shadow-sm transition hover:bg-[#E2EFE9]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="mt-3 text-center text-[9px] text-[#64847B]">
              {isPaused
                ? "Carousel paused"
                : "Cards automatically change every 3 seconds"}
            </p>
          </div>
        </section>

        {/* ================= BOTTOM CTA ================= */}

        <section className="relative overflow-hidden border-t border-[#C9DFD8] bg-[#E8F2EC] px-5 py-11 text-center">
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF8EF] text-[#287C78] shadow-sm"
          >
            <PawPrint size={22} />
          </motion.div>

          <h2 className="mt-4 text-lg font-extrabold text-[#205B56] sm:text-xl">
            Give Your Pet the Care They Deserve
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#52736D]">
            From health and nutrition to grooming and training,
            make every day a better day for your furry friend.
          </p>

          <Link
            href="/service/all"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#287C78] px-6 py-3 text-xs font-bold text-[#FAF8EF] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#205F5A] hover:shadow-lg"
          >
            Explore Our Services
            <ArrowRight size={15} />
          </Link>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border border-[#287C78]/15"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
