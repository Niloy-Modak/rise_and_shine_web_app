"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Data Structure
const NAV_LINKS = [
  {
    name: "Services",
    hasPlus: true,
    subLinks: [
      "Search & Growth Strategy",
      "Onsite SEO",
      "Content Experience",
      "B2B Marketing",
      "Digital PR",
      "Social Media",
      "Data & Insights",
    ],
    navBanner: "/services_image.jpg", // Ensure these exist in your /public folder
  },
  {
    name: "Industries",
    hasPlus: true,
    subLinks: ["E-commerce", "Finance", "Technology", "Travel", "Luxury"],
    navBanner: "/services_image.jpg",
  },
  {
    name: "International",
    hasPlus: true,
    subLinks: ["Global SEO", "US Market", "Europe", "Middle East"],
    navBanner: "/services_image.jpg",
  },
  {
    name: "About",
    hasPlus: true,
    subLinks: [
      "Our Story",
      "Meet The Risers",
      "Culture",
      "Testimonials",
      "Careers",
    ],
    navBanner: "/services_image.jpg",
  },
  { name: "Work", badge: 35 },
  { name: "Careers" },
  { name: "Blog" },
  { name: "Webinar" },
];

export default function Navbar() {
  const { scrollY } = useScroll();

  // Navigation States
  const [showTopBar, setShowTopBar] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isPill, setIsPill] = useState(false);

  // Interaction States
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(
    null,
  );

  const snappySpring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.5,
  } as const;

  const fastEase = {
    duration: 0.2,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  // Handle Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Show/Hide Top Promotion Bar
    setShowTopBar(latest <= 50);

    // Pill mode and Navbar visibility
    if (latest <= 100) {
      setIsPill(false);
      setHidden(false);
    } else {
      if (latest > previous && latest > 200) {
        setHidden(true); // Scrolling down: Hide
        setHoveredItem(null);
      } else if (latest < previous) {
        setHidden(false); // Scrolling up: Show
        setIsPill(true);
      }
    }
  });

  // Lock scroll when menus are active
  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || hoveredItem ? "hidden" : "unset";
  }, [isMobileMenuOpen, hoveredItem]);

  return (
    <>
      {/* 1. DESKTOP BACKGROUND BLUR FOCUS */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-55 bg-black/15 backdrop-blur-[14px] hidden lg:block"
          />
        )}
      </AnimatePresence>

      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
        className="fixed top-0 inset-x-0 z-60 flex flex-col items-center pointer-events-none"
      >
        {/* 2. TOP PROMOTION BAR (Hidden on Mobile) */}
        <motion.div
          animate={{
            height: showTopBar ? "auto" : 0,
            opacity: showTopBar ? 1 : 0,
          }}
          className="hidden lg:block w-full bg-[#D1F7E6] overflow-hidden pointer-events-auto"
        >
          <div className="py-2 text-center text-[11px] font-bold uppercase tracking-widest text-black">
            🎉 The Category Leaderboard - Live Now
          </div>
        </motion.div>

        {/* 3. MAIN NAVBAR */}
        <div className="w-full flex justify-center lg:pt-5 lg:px-4 pointer-events-none">
          <motion.nav
            layout
            onMouseLeave={() => setHoveredItem(null)}
            className={`relative flex items-center justify-between w-full pointer-events-auto transition-all duration-500 ease-in-out ${
              isPill
                ? " bg-white/75 backdrop-blur-[25px] saturate-180 lg:rounded-full py-2.5 px-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]  border-white/40"
                : "bg-transparent py-6 lg:py-5 px-6"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className={`text-xl lg:text-2xl font-bold tracking-tighter transition-colors duration-300 ${
                isPill || !showTopBar ? "text-black" : "text-white"
              }`}
            >
              Rise at Seven
              <span className="text-[10px] align-top ml-0.5">®</span>
            </Link>

            {/* Desktop Menu Links */}
            <div
              className={`hidden lg:flex items-center gap-x-8 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                isPill || !showTopBar ? "text-black/80" : "text-white"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative py-4 group"
                  onMouseEnter={() =>
                    setHoveredItem(link.hasPlus ? link.name : null)
                  }
                >
                  <span className="cursor-pointer flex items-center gap-1.5 transition-opacity group-hover:opacity-50">
                    {link.name}
                    {link.hasPlus && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${hoveredItem === link.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </span>
                  {link.badge && (
                    <span className="absolute -top-1 -right-6 bg-[#3EEFB0] text-[9px] text-black px-1.5 py-0.5 rounded-full font-black">
                      {link.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                className={`hidden lg:flex items-center px-7 py-3 rounded-full text-[11px] font-bold uppercase transition-all duration-300 ${
                  isPill || !showTopBar
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                Get In Touch{" "}
                <ArrowUpRight className="ml-1.5" size={14} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 transition-colors ${isPill || !showTopBar ? "text-black" : "text-white"}`}
              >
                <Menu size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* 4. MEGA MENU DROPDOWN */}
            <AnimatePresence>
              {hoveredItem && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={snappySpring} // Applied the snappy spring here
                  className="absolute top-[110%] left-1/2 -translate-x-1/2 w-fit bg-white rounded-[40px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-gray-100 flex gap-12 text-black normal-case tracking-normal z-50 overflow-hidden"
                >
                  <motion.div
                    key={hoveredItem}
                    // Reduced blur travel and scale distance for a faster "snap" into focus
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                    transition={fastEase}
                    className="flex gap-12"
                  >
                    {/* Left Link Side */}
                    <div className="flex flex-col gap-4 min-w-50">
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">
                        Explore {hoveredItem}
                      </div>
                      <div className="flex flex-col gap-y-4">
                        {NAV_LINKS.find(
                          (l) => l.name === hoveredItem,
                        )?.subLinks?.map((sub) => (
                          <Link
                            key={sub}
                            href="#"
                            className="text-[21px] font-bold tracking-tight hover:text-emerald-500 transition-colors whitespace-nowrap"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Image Side with Zoom Animation */}
                    <motion.div
                      whileHover="hoverState"
                      className="w-85 relative cursor-pointer group"
                    >
                      <div className="h-65 rounded-32 overflow-hidden relative shadow-lg bg-zinc-100">
                        <motion.div
                          variants={{ hoverState: { scale: 1.05 } }} // Reduced from 1.1 so it doesn't jump aggressively
                          transition={{
                            duration: 0.4, // Sped up from 0.8s
                            ease: [0.25, 1, 0.5, 1],
                          }}
                          className="w-full h-full relative"
                        >
                          <Image
                            src={
                              NAV_LINKS.find((l) => l.name === hoveredItem)
                                ?.navBanner || "/services_image.jpg"
                            }
                            alt="Visual"
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute bottom-5 left-5 z-10">
                          <button className="bg-black text-white text-[10px] font-bold uppercase px-5 py-2.5 rounded-full flex items-center gap-2 group-hover:bg-emerald-500 transition-colors duration-300">
                            View All {hoveredItem} <ArrowUpRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </motion.header>

      {/* 5. MOBILE MENU OVERLAY (ACCORDION STYLE) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Slightly faster mobile open
            className="fixed inset-0 z-70 bg-[#1A1A1C] text-white flex flex-col px-7 pt-8 pb-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold tracking-tighter">
                Rise at Seven®
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white/10 p-2 rounded-full"
              >
                <X size={30} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="border-b border-white/5 pb-4">
                  <div
                    className="flex items-center justify-between py-2 cursor-pointer"
                    onClick={() =>
                      link.hasPlus &&
                      setMobileExpandedItem(
                        mobileExpandedItem === link.name ? null : link.name,
                      )
                    }
                  >
                    <span className="text-2xl font-bold tracking-tighter leading-tight">
                      {link.name}
                    </span>
                    {link.hasPlus && (
                      <motion.div
                        animate={{
                          rotate: mobileExpandedItem === link.name ? 180 : 0,
                        }}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
                      >
                        <ChevronDown size={18} strokeWidth={1} />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile Sub links Drawer */}
                  <AnimatePresence>
                    {link.hasPlus && mobileExpandedItem === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 py-6 px-4 mr-2.5 bg-white/5 rounded-3xl mt-2">
                          {link.subLinks?.map((sub) => (
                            <Link
                              key={sub}
                              href="#"
                              className="text-lg font-semibold text-white/60 hover:text-white transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full bg-white text-black rounded-full py-5 text-base font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              Get In Touch <ArrowUpRight size={22} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
