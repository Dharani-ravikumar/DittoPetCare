
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowUpRight,
    Scissors,
    Stethoscope,
    House,
    Apple,
} from "lucide-react";

const services = [
    {
        title: "Grooming & Hygiene",
        description: "Bathing, haircuts, nail care and complete grooming.",
        image: "/images/homepages/services/db.png",
        icon: Scissors,
        link: "/AllServices/GroomingHygiene",
    },
    {
        title: "Veterinary & Health",
        description: "Health checkups, vaccinations and preventive care.",
        image: "/images/homepages/services/cv.png",
        icon: Stethoscope,
          link: "/service/veterinary-health"
    },
    {
        title: "Boarding & Training",
        description: "Safe boarding, daycare and professional pet training.",
        image: "/images/homepages/services/dt.png",
        icon: House,
       link: "/service/BoardingTraining",
    },
    {
        title: "Nutrition & Pet Spa",
        description: "Healthy diets, nutrition guidance and relaxing spa care.",
        image: "/images/homepages/services/cn.png",
        icon: Apple,
        link: "/service/nutrition-pet-spa",
    },
];

export default function ServicesSection() {
    return (
        <section
            id="services"
            className="bg-[#FFFFFF] px-5 py-16 sm:px-8 lg:px-16"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#287C78]">
                        What We Offer
                    </p>

                    <h2 className="text-2xl font-bold text-[#244B49] sm:text-3xl">
                        Complete Care for Your Furry Friends
                    </h2>

                    <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-[#526D68]">
                        Everything your pets need to stay happy, healthy and comfortable.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const ServiceIcon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileTap={{ scale: 0.98 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="mt-10"
                            >
                                <Link
                                    href={service.link}
                                    className="group relative block min-h-[190px] cursor-pointer overflow-visible rounded-3xl border border-[#DCE9E5] bg-white p-5 shadow-[0_5px_18px_rgba(40,124,120,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#287C78]/40 hover:shadow-[0_12px_30px_rgba(40,124,120,0.20),inset_0_0_18px_rgba(40,124,120,0.12)] active:scale-[0.98] active:shadow-[0_8px_25px_rgba(40,124,120,0.25),inset_0_0_22px_rgba(40,124,120,0.20)]"
                                >

                                    {/* Decorative Color */}
                                    <div className="pointer-events-none absolute right-0 top-0 h-18 w-25 rounded-bl-full bg-[#F3EDE0] transition-all duration-500 group-hover:scale-0" />

                                    {/* Image Appears on Hover */}
                                    <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-30 w-36 -translate-x-1/2 -translate-y-[75%] opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-active:opacity-100">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-full w-full object-contain object-bottom"
                                        />
                                    </div>

                                    {/* Card Content */}
                                    <div className="relative z-10 flex min-h-[150px] flex-col items-center justify-center text-center">

                                        {/* Icon */}
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F1ED] text-[#287C78] transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                                            <ServiceIcon size={21} strokeWidth={1.7} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base font-bold text-[#244B49]">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#526D68]">
                                            {service.description}
                                        </p>

                                        {/* Arrow */}
                                        <div className="absolute bottom-0 right-0">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F1ED] text-[#287C78] transition-all duration-500 group-hover:rotate-45 group-active:rotate-45">
                                                <ArrowUpRight size={17} />
                                            </span>
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
