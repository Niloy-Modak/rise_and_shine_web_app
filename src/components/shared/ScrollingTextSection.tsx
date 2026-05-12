"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollingTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Start animation when top of section hits bottom of viewport
  });

  // 2. Map scroll progress (0 to 1) to horizontal movement
  // Adjust "-20%" and "-100%" to control speed and direction
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden flex flex-col justify-between pb-10 lg:py-20"
    >

      {/* The Floating Text Section */}
      <div className="relative mt-10">
        <motion.h2
          style={{ x: xTranslate }}
          className="whitespace-nowrap text-[10vw] font-bold leading-none tracking-tighter text-black select-none"
        >
          Ready to Rise And Shine with us 
        </motion.h2>
      </div>

    </section>
  );
}
