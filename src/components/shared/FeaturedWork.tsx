"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "SIXT",
    date: "2023–2025",
    image: "/banner_image1.jpg",
    desc: "Redefining mobility for the global market",
  },
  {
    title: "Dojo – B2B",
    date: "2021–2025",
    image: "/banner_image2.jpg",
    desc: "Empowering small businesses with payment tech",
  },
  {
    title: "Magnet Trade",
    date: "2023–2024",
    image: "/banner_image3.jpg",
    desc: "Increasing brand and non-brand visibility UK/ES",
  },
  {
    title: "Leading E-Sim",
    date: "2023–2025",
    image: "/banner_image4.jpg",
    desc: "Connecting the world through digital SIMs",
  },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#ebebeb] h-auto md:h-[320vh]"
    >
      {/* cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-[#b8fff1] pointer-events-none"
        animate={{
          x: mousePos.x - 32,
          y: mousePos.y - 32,
          scale: hoveredIndex !== null ? 1 : 0,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 22,
          mass: 0.5,
        }}
      >
        <ArrowUpRight className="w-6 h-6 text-black" />
      </motion.div>

      <div className="relative md:sticky md:top-0 min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 py-6">
        <div className="relative flex min-h-[92vh] md:h-[92vh] w-full overflow-hidden rounded-3xl md:rounded-[40px] bg-[#0b0b0b] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          {/* label */}
          <p className="absolute left-8 top-8 z-20 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
            Featured Work
          </p>

          {/* desktop left */}
          <div className="hidden md:flex w-[58%] items-center px-14 lg:px-20">
            <div>
              {PROJECTS.map((project, i) => (
                <DesktopTitle
                  key={i}
                  project={project}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* desktop right */}
          <div className="hidden md:block w-[42%] overflow-hidden px-8 py-8">
            <motion.div style={{ y: imageY }} className="flex flex-col gap-12">
              {PROJECTS.map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  isHovered={hoveredIndex === i}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ))}
            </motion.div>
          </div>

          {/* mobile */}
          <div className="md:hidden w-full px-5 pt-20 pb-10 space-y-10">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 p-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#b8fff1]">
                      Project
                    </p>
                    <p className="text-white text-lg leading-snug">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white">
                    {project.title}
                  </h2>
                  <span className="text-[11px] font-mono text-white/30">
                    [{project.date}]
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- */

function DesktopTitle({
  project,
  index,
  progress,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  progress: any;
}) {
  const step = 1 / PROJECTS.length;
  const start = index * step;
  const middle = start + step / 2;
  const end = (index + 1) * step;

  const opacity = useTransform(progress, [start, middle, end], [0.15, 1, 0.15]);
  const x = useTransform(progress, [start, middle, end], [0, 28, 0]);

  return (
    <motion.div style={{ opacity, x }} className="mb-7 flex items-start">
      <h2 className="text-[5.3vw] lg:text-[5rem] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-white">
        {project.title}
      </h2>

      <span className="ml-3 mt-3 text-[11px] font-mono text-white/25">
        [{project.date}]
      </span>
    </motion.div>
  );
}

/* -------------------- */

function ProjectCard({
  project,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof PROJECTS)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 0.98 }}
      className="relative h-[60vh] w-full overflow-hidden rounded-[28px] border border-white/10 cursor-none"
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition duration-700 grayscale-[15%] hover:scale-105 hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex items-end bg-[#d68752]/95 backdrop-blur-md p-8"
          >
            <h3 className="text-black text-3xl font-semibold leading-tight tracking-tight">
              {project.desc}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
