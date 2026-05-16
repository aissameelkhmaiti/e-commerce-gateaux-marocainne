"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Cornes de Gazelle",
    subtitle: "L'élégance de l'amande et de la fleur d'oranger",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop", 
    color: "#8b5e34",
  },
  {
    id: 2,
    title: "Fakas Royale",
    subtitle: "Un tourbillon de saveurs miel et cannelle",
    image: "https://i.ytimg.com/vi/BflnoEsgmx8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsANh0Ss5sGRrr0ID0ydie7Nv3fQ",
    color: "#c29b40",
  },
  {
    id: 3,
    title: "Chebakia d'Antan",
    subtitle: "Le croquant parfumé au safran et sésame",
    image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp",
    color: "#5d4037",
  },
   {
    id: 4,
    title: "Chebakia d'Antan",
    subtitle: "Le croquant parfumé au safran et sésame",
    image: "https://i.ytimg.com/vi/WVi0i4QjL0Q/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAEahvABgW0nbSU8n-147S-PTdIRQ",
    color: "#5d4037",
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Animation automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-[#fdfaf5]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative h-full w-full"
        >
          {/* Image de fond avec overlay progressif */}
          <div className="absolute inset-0">
            <img
              src={SLIDES[current].image}
              alt={SLIDES[current].title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b]/80 via-[#1a120b]/40 to-transparent"></div>
          </div>

          {/* Contenu Texte */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <span className="inline-block text-[#c29b40] uppercase tracking-[0.3em] font-medium text-sm">
                Collection Artisanale
              </span>
              
              <h1 className="text-5xl lg:text-8xl font-serif text-white leading-tight">
                {SLIDES[current].title.split(' ')[0]} <br/>
                <span className="italic text-[#c29b40]">
                  {SLIDES[current].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-xl text-gray-200 font-light max-w-md italic">
                "{SLIDES[current].subtitle}"
              </p>

              <div className="flex gap-4 pt-6">
                <button className="bg-[#c29b40] hover:bg-[#201b0e] text-white px-15 py-4 rounded-sm flex items-center gap-3 transition-all duration-300 uppercase tracking-widest text-xs">
                  Commander <ArrowRight size={16} />
                </button>
                
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles Navigation */}
      <div className="absolute bottom-10 right-12 z-20 flex gap-4">
        <button 
          onClick={prevSlide}
          className="p-3 border border-white/20 rounded-full text-white hover:bg-[#c29b40] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 border border-white/20 rounded-full text-white hover:bg-[#c29b40] transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicateurs de progression (Barres horizontales) */}
      <div className="absolute bottom-0 left-0 w-full z-20 flex">
        {SLIDES.map((_, index) => (
          <div 
            key={index} 
            className="h-1.5 flex-1 bg-white/10 overflow-hidden"
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <motion.div 
                className="h-full bg-[#c29b40]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}