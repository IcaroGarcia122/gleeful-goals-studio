import React, { useCallback, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  url: string;
  title?: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
}

export function ThreeDCarousel({ items }: ThreeDCarouselProps) {
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[650px] flex items-center justify-center overflow-visible py-20" style={{ perspective: "1500px" }}>
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const offset = (i - index + items.length) % items.length;
            
            // Calculando a distância circular para determinar visibilidade e posição
            let normalizedOffset = offset;
            if (normalizedOffset > items.length / 2) normalizedOffset -= items.length;
            if (normalizedOffset < -items.length / 2) normalizedOffset += items.length;

            const isCenter = normalizedOffset === 0;
            const isLeft = normalizedOffset === -1;
            const isRight = normalizedOffset === 1;
            const isFarLeft = normalizedOffset === -2;
            const isFarRight = normalizedOffset === 2;

            // Apenas renderizamos os que estão próximos do centro para performance e estética
            if (Math.abs(normalizedOffset) > 2) return null;

            let x = 0;
            let rotateY = 0;
            let z = 0;
            let opacity = 0;
            let scale = 1;

            if (isCenter) {
              x = 0;
              rotateY = 0;
              z = 200;
              opacity = 1;
              scale = 1.1;
            } else if (isLeft) {
              x = typeof window !== 'undefined' && window.innerWidth < 768 ? -280 : -450;
              rotateY = 45;
              z = -150;
              opacity = 0.6;
              scale = 0.8;
            } else if (isRight) {
              x = typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 450;
              rotateY = -45;
              z = -150;
              opacity = 0.6;
              scale = 0.8;
            } else if (isFarLeft) {
              x = typeof window !== 'undefined' && window.innerWidth < 768 ? -450 : -750;
              rotateY = 60;
              z = -400;
              opacity = 0.2;
              scale = 0.7;
            } else if (isFarRight) {
              x = typeof window !== 'undefined' && window.innerWidth < 768 ? 450 : 750;
              rotateY = -60;
              z = -400;
              opacity = 0.2;
              scale = 0.7;
            }



            return (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, scale: 0.8, z: -500 }}
                animate={{
                  x: x,
                  rotateY: rotateY,
                  z: z,
                  opacity: opacity,
                  scale: scale,
                }}
                exit={{ opacity: 0, scale: 0.5, z: -500 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-[95%] md:w-[700px] aspect-[16/9] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] cursor-pointer ring-1 ring-white/10"

                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  if (normalizedOffset < 0) handlePrev();
                  if (normalizedOffset > 0) handleNext();
                }}
              >
                <img
                  src={item.url}
                  alt={item.title || "Gallery image"}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay de Vinheta/Gradiente para Profundidade */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 ${isCenter ? 'opacity-0' : 'opacity-60'} bg-black`} 
                />
                
                {isCenter && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                  >
                    <div className="w-10 h-[2px] bg-gold mb-3" />
                    <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">{item.title}</h3>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls com Glassmorphism */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 z-50">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-500 backdrop-blur-xl bg-white/5 shadow-lux group"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="flex gap-2">
          {items.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-gold w-6' : 'bg-gold/20'}`} 
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-500 backdrop-blur-xl bg-white/5 shadow-lux group"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

