"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  textColor: string;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  rotation: number;
}

const CARDS = [
  {
    title: "Pioneers",
    description: "We're dedicated to creating the industry narrative that others follow 3 years from now. We've paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    image: "/whatsnew/whats_new_image2.jpg",
    color: "bg-black",
    textColor: "text-white",
    rotation: -2,
  },
  {
    title: "Award Winning",
    description: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    image: "/whatsnew/whats_new_image1.jpg",
    color: "bg-[#bbf7d0]",
    textColor: "text-black",
    rotation: 3,
  },
  {
    title: "Speed",
    description: "People ask us why we are called Rise & Shine? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms.",
    image: "/whatsnew/whats_new_image3.jpg",
    color: "bg-white",
    textColor: "text-black",
    rotation: -1,
  },
];

export default function StackedSection() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={container}
      className="relative"
      // Giving extra height ensures the scroll isn't too fast/jumpy
      style={{ height: `${CARDS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center">
        {/* Label */}
        <div className="flex justify-center pt-10 shrink-0 z-50">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
            Legacy In The Making
          </p>
        </div>

        {/* Card Container */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {CARDS.map((card, i) => (
            <Card
              key={i}
              index={i}
              totalCards={CARDS.length}
              {...card}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  description,
  image,
  color,
  textColor,
  index,
  totalCards,
  progress,
  rotation,
}: CardProps) => {
  // Logic: 
  // Each card is active for its own segment.
  // Card 0: 0 to 0.33
  // Card 1: 0.33 to 0.66
  // Card 2: 0.66 to 1.0
  const step = 1 / totalCards;
  const start = index * step;
  const end = (index + 1) * step;

  // 1. Move the card up only when its turn starts.
  // We use -120% to ensure it fully exits the sticky viewport.
  const isLastCard = index === totalCards - 1;
  const y = useTransform(
    progress, 
    [start, end], 
    ["0%", isLastCard ? "0%" : "-120%"]
  );

  // 2. Scale up the card slightly as it becomes the "top" card.
  // Card 1 starts scaling when Card 0 starts moving.
  const scale = useTransform(
    progress,
    [start - step, start],
    [0.9, 1]
  );

  // 3. Stacking order: First card in array is physically on top (highest Z)
  const zIndex = totalCards - index;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{ zIndex }}
    >
      <motion.div
        style={{
          y,
          scale,
          rotate: rotation,
          transformOrigin: "bottom center",
          // This adds the 'deck' effect where cards aren't perfectly aligned
          // but look stacked behind each other.
          marginTop: `${index * 25}px`, 
        }}
        className={`relative w-full max-w-2xl rounded-[40px] p-8 md:p-14 shadow-2xl ${color} ${textColor} flex flex-col items-center text-center border border-black/10`}
      >
        <div className="w-32 h-32 md:w-44 md:h-44 mb-6 md:mb-10 overflow-hidden rounded-3xl shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8 tracking-tighter">
          {title}
        </h2>

        <div className="max-w-md">
          <p className="text-base md:text-xl leading-snug font-medium opacity-90">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};