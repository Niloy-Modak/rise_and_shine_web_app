"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PrimeButton from "@/components/ui/PrimeButton";
import Image from "next/image";

const services = [
  { id: 1, title: "Digital PR", hoverImage: "/banner_image1.jpg" },
  {
    id: 2,
    title: "Organic Social & Content",
    hoverImage: "/banner_image1.jpg",
  },
  {
    id: 3,
    title: "Search & Growth Strategy",
    hoverImage: "/banner_image1.jpg",
  },
  { id: 4, title: "Content Experience", hoverImage: "/banner_image1.jpg" },
  { id: 5, title: "Data & Insights", hoverImage: "/banner_image1.jpg" },
  { id: 6, title: "Onsite SEO", hoverImage: "/banner_image1.jpg" },
];

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-8">
      <div className="w-full mx-auto px-4 md:px-7 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/20 pb-6 lg:pb-12 mb-2">
          <div className="flex items-center gap-5">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight text-black flex items-center gap-4">
              Our
              <span className="inline-block w-10 h-10 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gray-200 relative">
                <Image
                  src="/banner_image1.jpg"
                  alt="Team"
                  fill
                  className="object-cover"
                  priority
                />
              </span>
              Services
            </h2>
          </div>

          <div className="hidden md:block">
            <PrimeButton text="View All Services" />
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer border-b border-black/20 flex items-center min-h-16 md:min-h-12 lg:min-h-25"
            >
              {/* Background */}
              <AnimatePresence>
                {hoveredId === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="absolute inset-y-2 -inset-x-3 z-0 rounded-full overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={service.hoverImage}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="relative z-10 w-full flex items-center justify-between px-2">
                <div className="flex items-center md:gap-4">
                  {/* Arrow */}
                  <div className="w-8 overflow-hidden flex justify-center">
                    <AnimatePresence>
                      {hoveredId === service.id && (
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                        >
                          <ArrowUpRight size={28} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 🔥 SAME LINE PREMIUM TEXT ANIMATION */}
                  <motion.h3
                    animate={{
                      scale: hoveredId === service.id ? 1.05 : 1,
                      letterSpacing:
                        hoveredId === service.id ? "-0.01em" : "-0.02em",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className={`text-3xl lg:text-5xl leading-tight ${
                      hoveredId === service.id
                        ? "text-white font-semibold"
                        : "text-black font-medium"
                    }`}
                    style={{ transformOrigin: "left center" }}
                  >
                    {service.title}
                  </motion.h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-16 md:hidden flex justify-center">
          <PrimeButton text="View All Services" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
