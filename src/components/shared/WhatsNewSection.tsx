"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import PrimeButton from "../ui/PrimeButton";
import Image from "next/image";

// --- Types ---
interface Article {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Rise & Shine Appoints Hollie Lovell as Senior Operations Lead",
    author: "Ray Saddiq",
    authorAvatar: "/author/author_image1.jpg",
    readTime: "3 mins",
    image: "/whatsnew/whats_new_image1.jpg",
  },
  {
    id: "2",
    title: "Rise & Shine Exits Sheffield and Triples Manchester as new HQ",
    author: "Sadie Adler",
    authorAvatar: "/author/author_image2.jpg",
    readTime: "2 mins",
    image: "/whatsnew/whats_new_image2.jpg",
  },
  {
    id: "3",
    title: "Ryan McNamara is Now Rise & Shine's Global Operations Director",
    author: "Carrie Rose",
    authorAvatar: "/author/author_image3.jpg",
    readTime: "2 mins",
    image: "/whatsnew/whats_new_image3.jpg",
  },
];

export default function WhatsNew() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom Pointer Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 400 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 400 });

  // Scroll Progress Logic
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="w-full mx-auto px-6 py-12 font-sans relative overflow-x-hidden">
      {/* Custom Pointer */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-[#bdf0d8] rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center shadow-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
      >
        <ArrowUpRight size={32} strokeWidth={2.5} className="text-gray-900" />
      </motion.div>

      {/* Header */}
      <header className="mb-8 md:mb-12">
        <h2 className="text-[40px] sm:text-[56px] md:text-[90px] lg:text-[110px] font-bold tracking-tighter leading-[0.9] text-black flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          What&apos;s
          <span className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative w-12 h-9 sm:w-14 sm:h-10 md:w-20 md:h-14 lg:w-24 lg:h-16 rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/art_image.jpg"
                alt="header icon"
                fill
                className="object-cover opacity-90"
                sizes="100px"
                priority
              />
            </div>
            New
          </span>
        </h2>
      </header>

      {/* Swipeable Grid Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory touch-pan-x scroll-smooth md:grid md:grid-cols-3 md:overflow-visible no-scrollbar"
        style={{ 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            className="flex-shrink-0 w-[85vw] md:w-full snap-center md:snap-align-none flex flex-col group md:cursor-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial="rest"
            whileHover="hover"
          >
            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:h-[420px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden mb-6 bg-gray-200">
              <motion.img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                variants={{ 
                    rest: { scale: 1 }, 
                    hover: { scale: 1.08 } // Slightly more zoom for drama
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Slow motion zoom
              />

              {/* SLOW MOTION BLUR OVERLAY */}
              <motion.div
                variants={{
                  rest: { clipPath: "circle(0% at 50% 100%)", opacity: 0 },
                  hover: { clipPath: "circle(150% at 50% 100%)", opacity: 1 },
                }}
                className="absolute inset-0 z-10 backdrop-blur-2xl bg-black/10 hidden md:block"
                transition={{ 
                    duration: 1.4, // Increased duration for slow motion
                    ease: [0.22, 1, 0.36, 1], // Quintic easing for premium feel
                }}
              />
            </div>

            {/* Meta Badges */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <div className="relative w-5 h-5">
                  <Image src={article.authorAvatar} alt={article.author} fill className="rounded-full object-cover" />
                </div>
                <span className="text-[13px] font-bold text-gray-800">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-[13px] font-bold text-gray-400">{article.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.15] tracking-tight text-gray-900 px-1">
              {article.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar - Mobile Only */}
      <div className="md:hidden flex items-center gap-3 mb-10 px-1">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="opacity-40">
          <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="relative flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="absolute top-0 left-0 h-full bg-black z-10"
            style={{ scaleX, originX: 0, width: "100%" }}
          />
          <motion.div
            className="absolute top-0 h-full bg-gray-400 rounded-full z-20"
            style={{
              width: "30%",
              left: useTransform(scrollXProgress, [0, 1], ["0%", "70%"]),
            }}
          />
        </div>

        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="opacity-40 rotate-180">
          <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="w-full flex justify-center items-center">
        <PrimeButton text="Explore More Thoughts" />
      </div>
    </section>
  );
}