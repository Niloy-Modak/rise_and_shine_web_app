"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CustomersHeadlineSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positioning logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Adding a spring effect makes the cursor follow "smoothly" rather than rigidly
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate position relative to the section
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const phrases = [
    { text: "Not Algorithms", img: "/banner_image5.jpg" },
    { text: "Chasing Customers", img: "/banner_image3.jpg" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden py-16 md:py-24 cursor-none" // Hide default cursor
    >
      {/* Custom Follower Cursor */}
      <motion.div
        className="pointer-events-none absolute z-50 flex items-center justify-center whitespace-nowrap rounded-full bg-[#B7F4E1] px-6 py-3 text-black shadow-xl"
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%", // Center the pill on the cursor
          y: "-50%",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
      >
        <span className="text-sm font-medium md:text-base">
          Send Us Your Brief
        </span>
        <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
      </motion.div>

      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-6 md:gap-12"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12"
            >
              {phrases.map((item, index) => (
                <React.Fragment key={index}>
                  <h2 className="text-[10vw] font-bold tracking-tighter text-[#1a1a1a] md:text-[140px]">
                    {item.text}
                  </h2>

                  <div className="relative h-[8vw] w-[12vw] flex-shrink-0 overflow-hidden rounded-xl md:h-[100px] md:w-[160px] md:rounded-3xl">
                    <Image
                      src={item.img}
                      alt={item.text}
                      fill
                      sizes="(max-width: 768px) 12vw, 160px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomersHeadlineSection;
