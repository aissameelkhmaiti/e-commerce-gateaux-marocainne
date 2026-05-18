"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  Truck,
  Heart,
  Send,
  CheckCircle2,
} from "lucide-react";

const ETAPES = [
  {
    id: 1,
    icon: <Compass className="text-[#c29b40]" size={28} />,
    title: "1. La Conception",
    desc: "Choisissez parmi nos variétés de pâtisseries fines (Cornes de gazelle, Chebakia, Fekkas…). Définissez les saveurs, les formats et le nombre de pièces selon vos besoins.",
  },
  {
    id: 2,
    icon: <Sparkles className="text-[#c29b40]" size={28} />,
    title: "2. La Personnalisation",
    desc: "Sélectionnez le support (plateaux en argent ciselé, coffrets en bois précieux) et les rubans aux couleurs de votre événement. Possibilité de personnaliser le packaging.",
  },
  {
    id: 3,
    icon: <Truck className="text-[#c29b40]" size={28} />,
    title: "3. La Livraison Événementielle",
    desc: "Nous coordonnons la livraison directement sur le lieu de votre réception partout au Maroc. Nos équipes veillent à un dressage esthétique et d'une fraîcheur irréprochable.",
  },
];

const UNIVERS = [
  {
    id: 1,
    title: "Mariages & Fiançailles",
    desc: "Des pièces montées traditionnelles et des plateaux d'amandes raffinés pour célébrer l'amour dans la plus pure tradition marocaine.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Naissances & Baptêmes",
    desc: "Des coffrets délicats (Akika) et des douceurs personnalisées pour célébrer la vie et accueillir vos proches avec la plus grande tendresse.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Corporate & Cadeaux d'Affaires",
    desc: "Marquez l'esprit de vos partenaires, clients ou collaborateurs avec des coffrets de prestige logotés aux couleurs de votre entreprise.",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
  },
];

export default function SurMesurePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDevisSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen font-sans">
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover brightness-[0.45]"
            alt="sur mesure"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf5] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 space-y-4">
          <span className="text-[#c29b40] uppercase tracking-[0.3em] text-xs">
            L'excellence pour vos grands moments
          </span>

          <h1 className="text-4xl md:text-6xl font-serif text-white">
            Vos Créations{" "}
            <span className="italic text-[#c29b40]">Sur-Mesure</span>
          </h1>

          <p className="text-gray-200 font-light">
            Mariage, fiançailles, baptême ou réception d'entreprise.
          </p>
        </div>
      </section>

      {/* ETAPES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif">Comment ça marche ?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {ETAPES.map((e) => (
            <div key={e.id} className="p-6">
              <div className="mb-4">{e.icon}</div>
              <h3 className="font-serif text-lg">{e.title}</h3>
              <p className="text-gray-500 text-sm">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERS */}
      <section className="py-20 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {UNIVERS.map((u) => (
            <div key={u.id} className="bg-white rounded-xl overflow-hidden">
              <img
                src={u.image}
                className="h-64 w-full object-cover"
                alt={u.title}
              />
              <div className="p-6">
                <h3 className="font-serif text-xl">{u.title}</h3>
                <p className="text-gray-500 text-sm">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto bg-[#fdfaf5] p-10 rounded-2xl">
          <h2 className="text-2xl font-serif mb-8 text-center">
            Demande de devis
          </h2>

          {isSubmitted ? (
            <motion.div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3">
              <CheckCircle2 className="text-emerald-600" />
              <div>
                <p className="font-medium">Demande envoyée</p>
                <p className="text-sm text-emerald-700">
                  Nous vous répondrons sous 24h.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleDevisSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full p-3 border rounded-lg"
                required
              />

              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full p-3 border rounded-lg"
                required
              />

              <select className="w-full p-3 border rounded-lg">
                <option>Mariage</option>
                <option>Baptême</option>
                <option>Entreprise</option>
              </select>

              <textarea
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="Votre message"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#c29b40] text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                Envoyer <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}