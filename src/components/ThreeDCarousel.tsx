import React, { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSITION_TIME = 0.5;
const ROTATION_OFFSET = 45;
const SCALE_OFFSET = 0.8;
const PERSPECTIVE = 1000;

interface CarouselItem {
  url: string;
  title?: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
}

export function ThreeDCarousel({ items }: ThreeDCarouselProps) {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden perspective-[1000px]">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center preserve-3d">
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const offset = (i - index + items.length) % items.length;
            const isCenter = offset === 0;
            const isLeft = offset === items.length - 1;
            const isRight = offset === 1;

            if (!isCenter && !isLeft && !isRight) return null;

            let x = 0;
            let rotateY = 0;
            let z = 0;
            let opacity = 0;
            let scale = 1;

            if (isCenter) {
              x = 0;
              rotateY = 0;
              z = 100;
              opacity = 1;
              scale = 1;
            } else if (isLeft) {
              x = -350;
              rotateY = 45;
              z = -200;
              opacity = 0.6;
              scale = 0.8;
            } else if (isRight) {
              x = 350;
              rotateY = -45;
              z = -200;
              opacity = 0.6;
              scale = 0.8;
            }

            return (
              <motion.div
                key={item.url}
                initial={false}
                animate={{
                  x: x,
                  rotateY: rotateY,
                  z: z,
                  opacity: opacity,
                  scale: scale,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute w-[80%] md:w-[600px] aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
              >
                <img
                  src={item.url}
                  alt={item.title || "Gallery image"}
                  className="w-full h-full object-cover"
                />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all backdrop-blur-md bg-white/5"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all backdrop-blur-md bg-white/5"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
