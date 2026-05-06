"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Controls the visibility of the greenish top bar
  const [showTopBar, setShowTopBar] = useState(true);
  // Controls if the navbar is currently hidden (scrolling down)
  const [hidden, setHidden] = useState(false);
  // Controls the transition from full-width to pill shape
  const [isPill, setIsPill] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // 1. Handle Top Bar (Green section) - Hides almost immediately on scroll
    if (latest > 50) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }

    // 2. Handle Navbar Position & Style
    if (latest <= 100) {
      // At the very top (Image 1)
      setIsPill(false);
      setHidden(false);
    } else {
      // Scrolled down (Position 2 & 3)
      if (latest > previous && latest > 150) {
        // Scrolling down (Image 3: hide everything)
        setHidden(true);
      } else if (latest < previous) {
        // Scrolling up (Image 4: Show as Pill)
        setHidden(false);
        setIsPill(true);
      }
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex flex-col items-center"
    >
      {/* 1. The Green Top Bar (Promotional Bar) */}
      <motion.div
        animate={{ height: showTopBar ? "auto" : 0, opacity: showTopBar ? 1 : 0 }}
        className="w-full bg-[#D1F7E6] overflow-hidden rounded-full mt-2"
      >
        <div className="py-2 text-center text-[11px] font-bold uppercase tracking-tight flex items-center justify-center gap-2">
          🎉 The Category Leaderboard - Live Now
        </div>
      </motion.div>

      {/* 2. The Main Navbar */}
      <div className="w-full flex justify-center pt-4 px-4">
        <motion.nav
          layout // This enables smooth transition between full-width and pill
          className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            isPill
              ? "w-full  bg-white/90 backdrop-blur-lg rounded-full py-3 px-8 shadow-xl  border-black/5"
              : "w-full bg-transparent py-4 px-6"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-bold tracking-tighter transition-colors duration-300 ${
              isPill || !showTopBar ? "text-black" : "text-white"
            }`}
          >
            Rise at Seven<span className="text-[10px] align-top ml-0.5">®</span>
          </Link>

          {/* Navigation Links */}
          <div
            className={`hidden lg:flex items-center gap-x-8 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 ${
              isPill || !showTopBar ? "text-black/80" : "text-white/90"
            }`}
          >
            <Link href="#" className="hover:opacity-50">Services +</Link>
            <Link href="#" className="hover:opacity-50">Industries +</Link>
            <Link href="#" className="hover:opacity-50">International +</Link>
            <Link href="#" className="hover:opacity-50">About +</Link>
            <div className="relative group cursor-pointer">
              Work 
              <span className="absolute -top-3 -right-5 bg-[#3EEFB0] text-[9px] text-black px-1.5 py-0.5 rounded-full font-black">
                35
              </span>
            </div>
            <Link href="#" className="hover:opacity-50">Careers</Link>
            <Link href="#" className="hover:opacity-50">Blog</Link>
            <Link href="#" className="hover:opacity-50">Webinar</Link>
          </div>

          {/* CTA Button */}
          <button
            className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase transition-all duration-300 ${
              isPill || !showTopBar
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Get In Touch ↗
          </button>
        </motion.nav>
      </div>
    </motion.header>
  );
}
