"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Reusable animated link component
const AnimatedLink = ({ title }: { title: string }) => {
  return (
    <motion.li
      initial="initial"
      whileHover="hovered"
      className="relative block cursor-pointer overflow-hidden whitespace-nowrap"
    >
      {/* Container for the sliding text */}
      <div className="relative">
        {/* Original Text (Slides Up) */}
        <motion.div
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-white/80"
        >
          {title}
        </motion.div>

        {/* Clone Text (Comes from Bellow, Colored) */}
        <motion.div
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="absolute inset-0 text-[#B2F6E3]"
        >
          {title}
        </motion.div>
      </div>
    </motion.li>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "f",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "X",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      label: "in",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "yt",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 58.38 58.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 58.38 58.38 0 0 1-15 0 2 2 0 0 1-2-2z" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
    {
      label: "tk",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      label: "ig",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] px-6 py-10 text-white md:px-12 md:py-16 rounded-t-[40px] font-sans">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl lg:max-w-[280px]">
              Stay updated with Rise news
            </h3>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full rounded-full bg-[#1a1a1a] py-4 pl-6 pr-14 text-sm text-gray-400 outline-none transition-all focus:ring-1 focus:ring-white/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#B7F4E1] p-2 text-black transition-transform hover:scale-110 active:scale-95">
                <ArrowUpRight size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium transition-all hover:bg-white hover:text-black"
                >
                  {social.icon}
                  <ArrowUpRight size={10} strokeWidth={3} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns with Animation */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-3 lg:pl-16">
            <div className="space-y-4">
              <ul className="space-y-2.5 text-lg font-bold tracking-tight">
                <AnimatedLink title="Services" />
                <AnimatedLink title="Work" />
                <AnimatedLink title="About" />
                <AnimatedLink title="Culture" />
                <AnimatedLink title="Meet The Risers" />
              </ul>
            </div>

            <div className="space-y-4 border-l border-white/5 pl-6 md:pl-10">
              <ul className="space-y-2.5 text-lg font-bold tracking-tight">
                <AnimatedLink title="Testimonials" />
                <AnimatedLink title="Blog & Resources" />
                <AnimatedLink title="Webinars" />
                <AnimatedLink title="Careers" />
              </ul>
            </div>

            <div className="space-y-4 border-l border-white/5 pl-6 md:pl-10 col-span-2 md:col-span-1">
              <ul className="space-y-2.5 text-lg font-bold tracking-tight">
                <AnimatedLink title="Sheffield" />
                <AnimatedLink title="Manchester" />
                <AnimatedLink title="London" />
                <AnimatedLink title="New York" />
                <li className="pt-4 font-black text-white text-xl cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Logo Section */}
        <div className="mt-24 border-b border-white/5 pb-6">
          <h1 className="flex items-start text-7xl md:text-8xl lg:text-[15rem] font-black leading-[0.75] tracking-tighter">
            Rise at SeveN
            <span className="relative">
              <span className="absolute -top-[1vw] right-[-3vw] text-[3vw] font-bold">
                ®
              </span>
            </span>
          </h1>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-8 flex flex-col gap-6 text-[10px] text-white/40 md:flex-row md:justify-between md:text-[11px] font-medium uppercase tracking-widest">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>© {currentYear} Rise at Seven Ltd. All rights reserved</span>
            <span className="opacity-20">•</span>
            <span>Company Number 11955187</span>
            <span className="opacity-20">•</span>
            <span>VAT Registered GB 322402945</span>
            <span className="opacity-20">•</span>
            <span className="cursor-pointer hover:text-white transition-colors underline underline-offset-4">
              Privacy Policy
            </span>
            <span className="opacity-20">•</span>
            <span className="cursor-pointer hover:text-white transition-colors underline underline-offset-4">
              Terms & conditions
            </span>
          </div>
          <div className="md:text-right">
            <span>Website MadeByShape</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
