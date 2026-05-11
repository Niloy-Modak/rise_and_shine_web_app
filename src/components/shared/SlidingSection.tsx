"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
  PanInfo,
} from "framer-motion";

// 1. DATA
const LOGO_DATA = [
  { id: 1, src: "/sectionii/emirates-airlines-logo.png" },
  { id: 2, src: "/sectionii/jd-sports-logo.png" },
  { id: 3, src: "/sectionii/lamborghini-logo.png" },
  { id: 4, src: "/sectionii/new-Red-Bull-logo.png" },
  { id: 5, src: "/sectionii/PS5-Logo.png" },
  { id: 6, src: "/sectionii/steam_black_logo.png" },
  { id: 7, src: "/sectionii/xbox-2-logo.png" },
  { id: 8, src: "/sectionii/yamahalogo.png" },
];

export default function SlidingSection() {
  // ANIMATION STATE
  const baseX = useMotionValue(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Slightly adjusted velocity for smoother math
  const baseVelocity = -0.1;

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (isInteracting) return;

    // We multiply by (delta / 16) to ensure the speed stays the same
    // whether the user has a 60Hz or 144Hz monitor.
    const moveBy = baseVelocity * (delta / 70);
    baseX.set(baseX.get() + moveBy);
  });

  const handlePan = (event: any, info: PanInfo) => {
    const dragFactor = 0.05;
    baseX.set(baseX.get() + info.delta.x * dragFactor);
  };

  return (
    <section className="w-full py-6 md:py-10 overflow-hidden flex flex-col md:flex-row items-start md:items-center select-none">
      {/* SECTION LABEL */}
      <div className="z-20  px-4 mb-6 md:mb-0 shrink-0">
        <h3 className="text-gray-900 md:text-lg font-medium tracking-tight">
          The agency behind ...
        </h3>
      </div>

      {/* TICKER VIEWPORT */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center">
        {/* LEFT NATURAL BLUR */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none backdrop-blur-md"
          style={{
            // This masks the BLUR itself so it fades away naturally
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
            background: "rgba(244, 244, 244, 0.4)", // Matches your #f4f4f4 background
          }}
        />

        {/* RIGHT NATURAL BLUR */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none backdrop-blur-md border-r-"
          style={{
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
            background: "rgba(244, 244, 244, 0.4)",
          }}
        />

        

        <motion.div
          className="flex items-center w-fit cursor-grab active:cursor-grabbing  border-r-8 "
          style={{ x }}
          onPanStart={() => setIsInteracting(true)}
          onPanEnd={() => setIsInteracting(false)}
          onPan={handlePan}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* We repeat the array twice to make the loop infinite */}
          {[...LOGO_DATA, ...LOGO_DATA].map((logo, index) => (
            <div key={index} className="shrink-0 px-10 md:px-14 py-4">
              <div className="relative w-28 h-12 md:w-36 md:h-16">
                <Image
                  src={logo.src}
                  alt="Client"
                  fill
                  className="object-contain pointer-events-none"
                  priority
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
