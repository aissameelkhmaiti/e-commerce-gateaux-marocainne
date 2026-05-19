"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote, CheckCircle, Heart, Award } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  tag: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Karim Benjelloun",
    role: "Client Vérifié",
    rating: 5,
    tag: "Authentique",
    comment:
      "Les cornes de gazelle ont exactement le goût de mon enfance. La pâte est incroyablement fine et le goût de la fleur d'oranger est subtil et pur. Une pure merveille !",
    date: "Il y a 2 jours",
  },
  {
    id: 2,
    name: "Yasmine Mansouri",
    role: "Acheteur Récurrent",
    rating: 5,
    tag: "Qualité Premium",
    comment:
      "Commande reçue à Casablanca le jour même pour un événement familial. La Chebakia était encore croustillante et le miel de très bonne qualité. Tout le monde a adoré.",
    date: "Il y a 1 semaine",
  },
  {
    id: 3,
    name: "Nadia Tazi",
    role: "Passionnée de Pâtisserie",
    rating: 5,
    tag: "Excellent Service",
    comment:
      "Le système de pesée en ligne est super ludique ! Mais c'est surtout la Ghriba aux amandes qui m'a conquise : fondante à souhait, pas trop sucrée, un équilibre parfait.",
    date: "Il y a 2 semaines",
  },
];

// ✅ FIX TypeScript Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function CustomerReviews() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#fdfaf5] py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center space-y-3 mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#c29b40] font-bold tracking-[0.25em] uppercase text-xs block"
          >
            Témoignages de nos gourmets
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-[#5d4037]"
          >
            Ce qu'ils disent de nos douceurs
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-0.5 w-24 bg-[#e8d5b5] mx-auto rounded-full"
          />
        </div>

        {/* REVIEWS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px -15px rgba(93, 64, 55, 0.08)",
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative bg-white rounded-[2rem] p-8 border border-[#e8d5b5]/50 shadow-sm flex flex-col justify-between overflow-hidden group"
            >
              {/* background icon */}
              <div className="absolute -right-6 -bottom-6 text-[#fdfaf5] group-hover:text-[#fbf4e9] transition-colors pointer-events-none">
                <Quote size={120} fill="currentColor" className="opacity-40" />
              </div>

              <div className="relative z-10 space-y-4">
                {/* TAG + STARS */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#fdfaf5] text-[#8b5e34] border border-[#e8d5b5]/60 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {review.tag}
                  </span>

                  <div className="flex text-[#c29b40]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={
                          hoveredIndex === index
                            ? { scale: [1, 1.2, 1] }
                            : {}
                        }
                      >
                        <Star size={14} fill="#c29b40" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* COMMENT */}
                <p className="text-[#8b5e34] text-sm italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* FOOTER */}
              <div className="relative z-10 pt-6 mt-6 border-t border-[#fdfaf5] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#5d4037]">
                    {review.name}
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-[#c29b40]">
                    <CheckCircle size={12} className="text-green-600" />
                    <span>{review.role}</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#8b5e34]/60">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM INFO */}
        <div className="mt-16 bg-white border border-[#e8d5b5]/40 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-1">
            <Heart size={20} className="text-[#c29b40]" />
            <span className="text-xs font-bold uppercase">
              99% de Satisfaction
            </span>
            <span className="text-[11px]">Sur plus de 1 500 commandes</span>
          </div>

          <div className="flex flex-col items-center gap-1 border-y sm:border-y-0 sm:border-x border-[#e8d5b5]/30 py-4 sm:py-0">
            <Award size={20} className="text-[#c29b40]" />
            <span className="text-xs font-bold uppercase">
              Recettes Ancestrales
            </span>
            <span className="text-[11px]">Ingrédients 100% naturels</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <CheckCircle size={20} className="text-[#c29b40]" />
            <span className="text-xs font-bold uppercase">
              Avis Certifiés
            </span>
            <span className="text-[11px]">Récoltés auprès de nos clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}