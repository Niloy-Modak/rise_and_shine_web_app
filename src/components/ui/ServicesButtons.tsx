"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const AnimatedButton = ({
  text,
  filled = false,
}: {
  text: string;
  filled?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-full transition-all duration-300 w-full md:w-auto cursor-pointer  ${
        filled
          ? "bg-white hover:shadow-md"
          : "bg-transparent hover:bg-black/3"
      }`}
    >
      <div className="flex items-center justify-center md:justify-start gap-2 px-6 py-3 md:px-7 md:py-3.5">
        
        {/* TEXT */}
        <div className="relative h-7 overflow-hidden ">
          <motion.div
            animate={{
              y: hovered ? "-50%" : "0%",
            }}
            transition={{
              duration: 0.35,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="flex flex-col items-center"
          >
            <span className="h-7 text-[17px] font-medium leading-7 tracking-[-0.02em] text-black">
              {text}
            </span>

            <span className="h-7 text-[17px] font-medium leading-7 tracking-[-0.02em] text-black">
              {text}
            </span>
          </motion.div>
        </div>

        {/* ARROW */}
        <div className="relative h-5 w-5 overflow-hidden">
          <motion.div
            animate={{
              y: hovered ? "-50%" : "0%",
            }}
            transition={{
              duration: 0.35,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="flex flex-col "
          >
            <div className="flex h-5 items-center justify-center">
              <ArrowUpRight className="h-4.5 w-4.5" />
            </div>

            <div className="flex h-5 items-center justify-center">
              <ArrowUpRight className="h-4.5 w-4.5" />
            </div>
          </motion.div>
        </div>
      </div>
    </button>
  );
};

export default function ServicesButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      <AnimatedButton text="Our Story" filled />
      <AnimatedButton text="Our Services" />
    </div>
  );
}