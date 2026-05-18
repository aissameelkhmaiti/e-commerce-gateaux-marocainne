"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Cake, Award } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    icon: <Truck className="text-[#c29b40]" size={32} />,
    title: "Livraison Sécurisée",
    subtitle: "Partout au Maroc",
    desc: "Vos pâtisseries sont emballées avec le plus grand soin dans des boîtes isothermes et livrées chez vous en 24h à 48h, garantissant une fraîcheur absolue à l'arrivée."
  },
  {
    id: 2,
    icon: <Cake className="text-[#c29b40]" size={32} />,
    title: "Événements & Cérémonies",
    subtitle: "Sur-mesure",
    desc: "Mariages, baptêmes ou réceptions : nous composons des plateaux prestigieux, personnalisés et adaptés à vos thèmes pour émerveiller vos invités."
  },
  {
    id: 3,
    icon: <Award className="text-[#c29b40]" size={32} />,
    title: "Savoir-faire Ancestral",
    subtitle: "100% Artisanal & Premium",
    desc: "Des ingrédients nobles (amandes pures, miel de l'Atlas, eau de fleur d'oranger distillée) façonnés à la main selon les recettes traditionnelles, sans aucun conservateur."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[#fdfaf5] border-t border-[#8b5e34]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* En-tête de la section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#c29b40] uppercase tracking-[0.2em] font-medium text-xs block">
            L'Excellence Allo Lhalawa
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif text-[#1a120b] leading-tight">
            Nos Engagements & <span className="italic text-[#c29b40]">Services</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#c29b40] mx-auto my-4"></div>
          <p className="text-sm text-gray-600 font-light max-w-md mx-auto">
            Plus qu'une simple pâtisserie, nous vous offrons une expérience gastronomique marocaine authentique et un service irréprochable.
          </p>
        </div>

        {/* Grille des 3 Services principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Icône avec effet au survol */}
                <div className="p-3 bg-[#fdfaf5] group-hover:bg-[#c29b40]/10 rounded-xl w-fit border border-[#c29b40]/20 transition-colors duration-300 mb-6">
                  {service.icon}
                </div>

                {/* Titres */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c29b40] font-semibold">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-serif text-[#1a120b] font-medium">
                    {service.title}
                  </h3>
                </div>

                {/* Description détaillée */}
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}