"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BANNER_IMAGES = [
  {
    id: 1,
    bannerImage:
      "/banner_image1.jpg",
  },
  {
    id: 2,
    bannerImage:
      "/banner_image2.jpg",
  },
  {
    id: 3,
    bannerImage:
      "/banner_image3.jpg",
  },
  {
    id: 4,
    bannerImage:
      "/banner_image4.jpg",
  },
  {
    id: 5,
    bannerImage:
      "/banner_image5.jpg",
  },
];

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomImg = BANNER_IMAGES[Math.floor(Math.random() * BANNER_IMAGES.length)].bannerImage;
      setCurrentImage(randomImg);
      setMounted(true);
    }, 0);

    // Always clean up timers in useEffect!
    return () => clearTimeout(timer);
  }, []);

  // Show a blank colored screen until the client-side code picks an image
  if (!mounted) return <div className="h-screen w-full bg-[#BFF7DA]" />;

  // --- THE DOME SLIDE-UP ANIMATION ---
  const containerReveal = {
    hidden: {
      y: "100vh", 
      borderTopLeftRadius: "50% 30vh",
      borderTopRightRadius: "50% 30vh",
    },
    visible: {
      y: 0,
      borderTopLeftRadius: "0% 0vh", 
      borderTopRightRadius: "0% 0vh",
      transition: {
        duration: 1.2, 
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const textStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster staggering for a modern look
        delayChildren: 0.5, // Starts appearing mid-way through the slide-up
      },
    },
  };

  const textItem = {
    hidden: { y: 25, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section className="relative h-screen w-full bg-[#BFF7DA] overflow-hidden">
      {/* THE ANIMATED PANEL - REVEALS EVERY TIME */}
      <section className="rounded-3xl ">
        <motion.div
        variants={containerReveal}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-full bg-black z-10 overflow-hidden "
      >
        {/* BLURRED BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={currentImage}
            alt="Banner Background"
            fill
            priority
            className="object-cover opacity-50 blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />
        </div>

        {/* CONTENT */}
        <motion.div
          variants={textStagger}
          initial="hidden"
          animate="visible"
          className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4"
        >
          {/* Awards Label */}
          <motion.div variants={textItem} className="mb-8 md:mb-10 w-full">
            <p className="text-xs font-medium uppercase  mb-3 md:mb-4 opacity-90 px-2 text-center">
              #1 Most Recommended Content Marketing Agency
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 opacity-60 text-[8px] md:text-[9px] font-bold">
              <span>🌿 GLOBAL SEARCH AWARDS</span>
              <span>👑 THE DRUM</span>
              <span>🌿 CONTENT AWARDS</span>
            </div>
          </motion.div>

          {/* Title with SHARP Inset Image */}
          <div className="flex flex-col items-center select-none w-full  md:px-0">
            <motion.h1
              variants={textItem}
              className="text-[11vw] sm:text-[10vw] md:text-[9vw] font-medium leading-[0.85] tracking-tighter"
            >
              We Create
            </motion.h1>

            <motion.div
              variants={textItem}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-8 mt-2 md:mt-0 w-full"
            >
              <h1 className="text-[11vw] sm:text-[10vw] md:text-[9vw] font-medium leading-[0.85] tracking-tighter">
                Category
              </h1>

              {/* THE SHARP MINI-IMAGE */}
              <div className="relative shrink-0 w-[20vw] h-[14vw] sm:w-[14vw] sm:h-[9vw] md:w-[11vw] md:h-[7.5vw] rounded-lg md:rounded-[2.5rem] overflow-hidden -rotate-3 shadow-2xl border-2 border-white/10 mt-1 md:mt-2">
                <Image
                  src={currentImage}
                  alt="Feature Visual"
                  fill
                  className="object-cover scale-105"
                />
              </div>

              <h1 className="text-[11vw] sm:text-[10vw] md:text-[9vw] font-medium leading-[0.85] tracking-tighter">
                Leaders
              </h1>
            </motion.div>
          </div>

          <motion.p
            variants={textItem}
            className="mt-6 md:mt-10 text-[4vw] md:text-2xl font-light tracking-wide opacity-80"
          >
            on every searchable platform
          </motion.p>
        </motion.div>

        {/* BOTTOM FOOTER TEXT */}
        <div className="absolute bottom-6 md:bottom-8 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end text-[8px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest md:tracking-[0.2em] z-20 gap-3 md:gap-4">
          <div className="max-w-75 text-center md:text-left leading-relaxed">
            Organic media planners creating, <br className="hidden md:block" />
            distributing & optimising search-first content
          </div>
          <div className="text-center md:text-right">
            4 Global Offices serving <br className="hidden md:block" />{" "}
            <span className="text-white">UK, USA & EU</span>
          </div>
        </div>
      </motion.div>
      </section>
    </section>
  );
}
