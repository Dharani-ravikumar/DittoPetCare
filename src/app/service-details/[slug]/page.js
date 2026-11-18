
"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Sparkles,
  PawPrint,
  Star,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceDetails } from "@/data/serviceData";

export default function ServiceDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params.slug;
  const category = searchParams.get("category") || "Pet Care";

  const service = getServiceDetails(slug, category);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAF8F0] px-5 text-center">
          <PawPrint size={40} className="text-[#287C78]" />
          <h1 className="mt-4 text-xl font-bold text-[#245D59]">
            Service Not Found
          </h1>
          <p className="mt-2 text-sm text-[#547873]">
            The service you are looking for is unavailable.
          </p>
          <Link
            href="/service"
            className="mt-5 rounded-full bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#205F5B]"
          >
            Explore Services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const bookingService = `${service.category} - ${service.title}`;

  // Display exactly four process cards
  const processSteps = (service.process || []).slice(0, 4);

  // Use the image belonging to the selected service card
  const serviceImage = service.image;

  // BACK TO PREVIOUS PAGE
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/service");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F0] text-[#245D59]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative px-5 pb-14 pt-6 sm:px-8 lg:px-16 lg:pb-16 lg:pt-8">
        <div className="absolute right-0 top-0 -z-0 h-80 w-80 rounded-full bg-[#E9F1E9] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={handleBack}
            className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-[#287C78] transition hover:gap-3 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to services
          </button>

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

            {/* HERO CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E8DF] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#287C78] sm:text-xs">
                <PawPrint size={13} />
                {service.category}
              </span>

              <h1 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-[#245D59] sm:text-3xl lg:text-4xl">
                {service.title}
              </h1>

              <div className="mt-4 h-1 w-14 rounded-full bg-[#287C78]" />

              <p className="mt-4 max-w-xl text-xs leading-6 text-[#547873] sm:text-sm sm:leading-7">
                {service.shortDescription}
              </p>

              <p className="mt-3 max-w-xl text-xs leading-6 text-[#547873] sm:text-sm sm:leading-7">
                {service.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={`/booking?service=${encodeURIComponent(bookingService)}`}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-[#287C78] px-4 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#205F5B] sm:px-5 sm:py-2.5 sm:text-xs"
                >
                  Book This Service
                  <ArrowRight
                    size={12}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <div className="flex items-center gap-2 text-[10px] font-medium text-[#287C78] sm:text-xs">
                  <ShieldCheck size={16} />
                  Care you can trust
                </div>
              </div>
            </motion.div>

            {/* REDUCED SERVICE IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]"
            >
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full border border-[#B9D9D0] sm:-right-4 sm:-top-4 sm:h-24 sm:w-24" />

              <div className="relative rounded-[22px] border border-[#DCEBE2] bg-white p-2 shadow-lg sm:rounded-[25px] sm:p-2.5">
                {serviceImage ? (
                  <img
                    key={serviceImage}
                    src={serviceImage}
                    alt={service.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-[190px] w-full rounded-[17px] object-cover sm:h-[230px] sm:rounded-[20px]"
                  />
                ) : (
                  <div className="flex h-[190px] w-full items-center justify-center rounded-[17px] bg-[#EAF3EC] text-[#287C78] sm:h-[230px]">
                    <PawPrint size={40} />
                  </div>
                )}
              </div>

              {/* FLOATING LABEL */}
              <div className="absolute -bottom-4 left-3 flex items-center gap-2 rounded-xl border border-[#E0ECE5] bg-white px-3 py-2.5 shadow-lg sm:-bottom-5 sm:left-5 sm:gap-3 sm:px-4 sm:py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3EC] text-[#287C78]">
                  <Heart size={17} />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#245D59]">
                    Care with love
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#547873]">
                    Every pet matters
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CARE HIGHLIGHTS */}
      <section className="border-y border-[#DCEBE2] bg-white px-5 py-6 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#287C78]">
              <Heart size={19} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#245D59]">
                Loving Attention
              </p>
              <p className="mt-1 text-[10px] text-[#547873]">
                Individual pet care
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#287C78]">
              <ShieldCheck size={19} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#245D59]">
                Safe Experience
              </p>
              <p className="mt-1 text-[10px] text-[#547873]">
                Comfort comes first
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#287C78]">
              <Sparkles size={19} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#245D59]">
                Thoughtful Care
              </p>
              <p className="mt-1 text-[10px] text-[#547873]">
                Every detail matters
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE PROCESS */}
      <section className="bg-[#FAF8F0] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-7 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#287C78] sm:text-xs">
              The Experience
            </span>

            <h2 className="mt-2 text-xl font-bold text-[#245D59] sm:text-2xl">
              How We Care for Your Pet
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-[#547873] sm:text-sm">
              A thoughtful approach to every visit, designed to make your
              pet feel comfortable, happy and cared for.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.96,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="group rounded-xl border border-[#DFEBE2] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#9CCBC0] hover:shadow-lg sm:p-5"
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#287C78] transition-colors duration-300 group-hover:bg-[#287C78] group-hover:text-white"
                >
                  {index === 0 ? (
                    <PawPrint size={18} />
                  ) : index === 1 ? (
                    <Heart size={18} />
                  ) : index === 2 ? (
                    <ShieldCheck size={18} />
                  ) : (
                    <Sparkles size={18} />
                  )}
                </motion.div>

                <h3 className="mt-3 text-xs font-bold leading-5 text-[#245D59] sm:text-sm">
                  {step.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-[#547873] sm:text-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#EAF3EC] px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#287C78] sm:text-xs">
              The Difference
            </span>

            <h2 className="mt-2 max-w-lg text-xl font-bold leading-tight text-[#245D59] sm:text-2xl lg:text-3xl">
              More Than a Service, It's Care That Comes From the Heart
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-[#547873] sm:text-sm sm:leading-7">
              We understand that pets are family. That's why we focus on
              providing a caring and comfortable experience that respects
              their individual needs.
            </p>

            <div className="mt-6 space-y-3">
              {(service.benefits || []).map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#287C78] text-white">
                    <CheckCircle2 size={13} />
                  </div>

                  <p className="text-xs leading-6 text-[#245D59] sm:text-sm">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="rounded-[22px] border border-[#DCEBE2] bg-white p-5 shadow-md sm:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#287C78]">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-4 text-base font-bold text-[#245D59]">
                Your Pet's Wellbeing Comes First
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#547873] sm:text-sm">
                From the first interaction to the final moments of the
                service, we aim to create an experience built around
                comfort, patience and genuine care.
              </p>

              <div className="mt-5 border-t border-[#DCEBE2] pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3EC] text-[#287C78]">
                    <Star size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#245D59]">
                      A little extra love
                    </p>
                    <p className="mt-1 text-[10px] text-[#547873]">
                      Because every pet is special
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="bg-[#FAF8F0] px-5 py-9 sm:px-8 sm:py-11">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-[#245D59] px-5 py-6 text-center shadow-md sm:px-8 sm:py-7">

          <div className="absolute -left-12 -top-16 h-32 w-32 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -right-10 h-36 w-36 rounded-full border border-white/10" />

          <div className="relative z-10">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <PawPrint size={18} />
            </div>

            <h2 className="mx-auto mt-3 max-w-lg text-lg font-bold leading-snug text-white sm:text-xl">
              Give Your Pet the Care They Deserve
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[10px] leading-5 text-white/80 sm:text-xs">
              Make your pet's next experience a special one. Book your
              preferred service with us today.
            </p>

            <Link
              href={`/booking?service=${encodeURIComponent(bookingService)}`}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F0] px-5 py-2.5 text-xs font-bold text-[#245D59] transition hover:-translate-y-1 hover:bg-white"
            >
              Book Your Service
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
