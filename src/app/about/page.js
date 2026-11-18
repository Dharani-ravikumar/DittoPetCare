
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PawPrint,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Star,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Heart,
    title: "Love Comes First",
    description:
      "Every pet deserves kindness, patience, and genuine care. We treat every furry friend like family.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Trust",
    description:
      "Your pet's comfort and safety are always our priority.",
  },
  {
    icon: Sparkles,
    title: "Quality Products",
    description:
      "We focus on useful, carefully selected products for everyday pet needs.",
  },
  {
    icon: Users,
    title: "Pet Parent Support",
    description:
      "Friendly guidance and support for every pet parent.",
  },
];

const services = [
  "Professional grooming and hygiene",
  "Healthy nutrition and pet spa",
  "Comfortable boarding and training",
  "Veterinary and health assistance",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-[#FAF7EE] text-[#244B49]">

        {/* HERO SECTION */}
        <section className="px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DDEFEA] px-4 py-2 text-xs font-semibold text-[#287C78]">
                <PawPrint size={13} />
                GET TO KNOW US
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
                More Than Care,
                <span className="mt-2 block text-[#287C78]">
                  It's a Love Story.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-xs leading-7 text-[#526D68]">
                At DittoPetCare, we believe pets are family. We bring
                together loving pet care services and quality pet products
                to make every furry friend feel happy, healthy, and loved.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-[#287C78] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#244B49]"
                >
                  Book an Appointment
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/products"
                  className="rounded-full border border-[#287C78] px-6 py-3 text-xs font-semibold text-[#287C78] transition hover:bg-[#DDEFEA]"
                >
                  Visit Our Shop
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#B8D9D1]/60 blur-2xl" />

              <div className="relative overflow-hidden rounded-[28px] border-8 border-white shadow-lg">
                <img
                  src="/images/about/top.jpeg"
                  alt="Happy pets enjoying loving care"
                  className="h-[250px] w-full object-cover sm:h-[320px]"
                />
              </div>

              <div className="absolute -bottom-4 left-3 rounded-xl bg-white p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#DDEFEA] p-2 text-[#287C78]">
                    <Heart size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Care with Love</p>
                    <p className="mt-1 text-xs text-[#526D68]">
                      Every pet matters
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* OUR STORY */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                OUR STORY
              </span>

              <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                A Little Love Makes
                <span className="text-[#287C78]">
                  {" "}A Big Difference.
                </span>
              </h2>

              <p className="mt-5 text-xs leading-7 text-[#526D68]">
                DittoPetCare was created with one simple belief: pets
                deserve the same love, attention, and care that we give
                to our families.
              </p>

              <p className="mt-4 text-xs leading-7 text-[#526D68]">
                We bring together pet care services and carefully
                selected products to support pet parents through every
                stage of their pet's journey.
              </p>

              <p className="mt-4 text-xs leading-7 text-[#526D68]">
                Whether your furry friend needs a refreshing grooming
                session, a comfortable stay, or everyday essentials,
                we want to make pet parenting easier and happier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mx-auto w-full max-w-md"
            >
              <img
                src="/images/about/2.jpeg"
                alt="Pet owner spending quality time with a dog"
                className="h-[250px] w-full rounded-[26px] object-cover shadow-md sm:h-[320px]"
              />
            </motion.div>

          </div>
        </section>

        {/* MISSION AND VISION */}
        <section className="px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                WHAT DRIVES US
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Our Mission & Vision
              </h2>

              <p className="mt-3 text-xs leading-7 text-[#526D68]">
                Everything we do begins with the happiness and
                well-being of your pets.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-[26px] bg-[#287C78] p-7 text-white shadow-md sm:p-9"
              >
                <Heart size={25} />

                <h3 className="mt-5 text-sm font-bold">
                  Our Mission
                </h3>

                <p className="mt-3 text-xs leading-7 text-white/85">
                  To provide loving, reliable, and quality pet care
                  services and products that help every pet live a
                  healthier, happier, and more comfortable life.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-[26px] border border-[#DCE9E5] bg-white p-7 shadow-md sm:p-9"
              >
                <Sparkles size={25} className="text-[#287C78]" />

                <h3 className="mt-5 text-sm font-bold">
                  Our Vision
                </h3>

                <p className="mt-3 text-xs leading-7 text-[#526D68]">
                  To build a trusted and welcoming pet care community
                  where every pet feels special and every pet parent
                  feels supported.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* OUR VALUES */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                WHAT MAKES US DIFFERENT
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                The Values Behind Our Care
              </h2>

              <p className="mt-3 text-xs leading-7 text-[#526D68]">
                The little things that make a big difference in every
                pet's life.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-[#DCE9E5] bg-[#FAF7EE] p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="inline-flex rounded-xl bg-[#DDEFEA] p-3 text-[#287C78]">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-4 text-xs font-bold">
                      {value.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-[#526D68]">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* PET CARE SERVICES */}
        <section className="px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

            <div>
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                OUR PET CARE SERVICES
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Loving Care for
                <span className="text-[#287C78]">
                  {" "}Every Little Paw.
                </span>
              </h2>

              <p className="mt-4 text-xs leading-7 text-[#526D68]">
                Your pet deserves attention at every stage of life.
                Discover our range of pet care services designed
                around comfort and well-being.
              </p>

              <div className="mt-6 space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#287C78]"
                    />

                    <span className="text-xs font-medium text-[#526D68]">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/AllServices/GroomingHygiene"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#287C78] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#244B49]"
              >
                Explore Services
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <img
                src="/images/about/3.jpeg"
                alt="Dog receiving gentle pet care"
                className="h-[250px] w-full rounded-[26px] object-cover shadow-md sm:h-[320px]"
              />

              <div className="absolute -bottom-4 -left-3 rounded-xl bg-white p-4 shadow-md">
                <Stethoscope
                  className="text-[#287C78]"
                  size={21}
                />

                <p className="mt-2 text-xs font-bold">
                  Care for Every Stage
                </p>

                <p className="mt-1 text-xs text-[#526D68]">
                  Happy pets, happy families
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PET SHOP INTRODUCTION - NO CATEGORY LINKS */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[28px] bg-[#FAF7EE] p-6 sm:p-9 md:grid-cols-2">

            <div>
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                OUR PET SHOP
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Little Essentials,
                <span className="text-[#287C78]">
                  {" "}Big Happiness.
                </span>
              </h2>

              <p className="mt-4 text-xs leading-7 text-[#526D68]">
                Along with pet care services, we offer a collection
                of pet products for your furry companions. From
                walking accessories and feeding essentials to
                comfortable beds, grooming items, and playful toys,
                find everyday essentials for your pets.
              </p>

              <div className="mt-5 flex items-center gap-2 text-[#287C78]">
                <ShoppingBag size={17} />
                <span className="text-xs font-semibold">
                  Pet Products & Everyday Essentials
                </span>
              </div>

              <Link
                href="/products"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#287C78] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#244B49]"
              >
                Visit Our Shop
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mx-auto w-full max-w-[300px]">
              <img
                src="/images/about/4.jpeg"
                alt="Pet products and accessories"
                className="h-[210px] w-full rounded-[24px] object-cover shadow-md sm:h-[250px]"
              />
            </div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#287C78]">
                WHY DITTOPETCARE
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                A Better Experience for Pet Parents
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[#DCE9E5] bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                  <Heart size={20} />
                </div>

                <h3 className="mt-4 text-xs font-bold">
                  Loving Attention
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#526D68]">
                  We put your pet's happiness and comfort first.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[#DCE9E5] bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                  <ShoppingBag size={20} />
                </div>

                <h3 className="mt-4 text-xs font-bold">
                  Care & Products Together
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#526D68]">
                  Discover useful products and pet care services in one place.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[#DCE9E5] bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="mt-4 text-xs font-bold">
                  Trust & Comfort
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#526D68]">
                  A friendly experience for pets and their families.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 pb-14 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-6xl rounded-[28px] bg-[#244B49] px-6 py-12 text-center text-white sm:px-12 sm:py-14">

            <PawPrint
              className="mx-auto text-[#B8D9D1]"
              size={30}
            />

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Your Pet Deserves the Best.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-xs leading-7 text-white/75">
              From everyday essentials to loving care services,
              we are here to make every little paw feel special.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#287C78] transition hover:bg-[#DDEFEA]"
              >
                Book an Appointment
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Shop Products
                <ShoppingBag size={14} />
              </Link>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
