"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Truck, Heart, ArrowRight, Send, CheckCircle2 } from "lucide-react";

const ETAPES = [
  {
    id: 1,
    icon: <Compass className="text-[#c29b40]" size={28} />,
    title: "1. La Conception",
    desc: "Choisissez parmi nos variétés de pâtisseries fines (Cornes de gazelle, Chebakia, Fekkas…). Définissez les saveurs, les formats et le nombre de pièces selon vos besoins."
  },
  {
    id: 2,
    icon: <Sparkles className="text-[#c29b40]" size={28} />,
    title: "2. La Personnalisation",
    desc: "Sélectionnez le support (plateaux en argent ciselé, coffrets en bois précieux) et les rubans aux couleurs de votre événement. Possibilité de personnaliser le packaging."
  },
  {
    id: 3,
    icon: <Truck className="text-[#c29b40]" size={28} />,
    title: "3. La Livraison Événementielle",
    desc: "Nous coordonnons la livraison directement sur le lieu de votre réception partout au Maroc. Nos équipes veillent à un dressage esthétique et d'une fraîcheur irréprochable."
  }
];

const UNIVERS = [
  {
    id: 1,
    title: "Mariages & Fiançailles",
    desc: "Des pièces montées traditionnelles et des plateaux d'amandes raffinés pour célébrer l'amour dans la plus pure tradition marocaine.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Naissances & Baptêmes",
    desc: "Des coffrets délicats (Akika) et des douceurs personnalisées pour célébrer la vie et accueillir vos proches avec la plus grande tendresse.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Corporate & Cadeaux d'Affaires",
    desc: "Marquez l'esprit de vos partenaires, clients ou collaborateurs avec des coffrets de prestige logotés aux couleurs de votre entreprise.",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
  }
];

export default function SurMesurePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDevisSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Logique d'envoi de devis
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen font-sans">
      
      {/* 1. SECTION HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop" 
            alt="Sur mesure" 
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf5] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 space-y-4">
          <span className="text-[#c29b40] uppercase tracking-[0.3em] font-medium text-xs block">
            L'excellence pour vos grands moments
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            Vos Créations <span className="italic text-[#c29b40]">Sur-Mesure</span>
          </h1>
          <p className="text-base text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Mariage, fiançailles, baptême ou réception d'entreprise : donnez à vos événements la saveur de l'exceptionnel. Nous concevons avec vous des compositions uniques.
          </p>
        </div>
      </section>


      {/* 2. SECTION NOTRE CONCEPT (3 ÉTAPES) */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[#c29b40] text-xs uppercase tracking-widest font-semibold block">Le Processus</span>
            <h2 className="text-3xl font-serif text-[#1a120b]">Comment ça marche ?</h2>
            <div className="h-[1px] w-12 bg-[#c29b40] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {ETAPES.map((etape) => (
              <div key={etape.id} className="space-y-4 p-6 rounded-xl hover:bg-[#fdfaf5]/50 transition-colors duration-300">
                <div className="p-3 bg-[#fdfaf5] border border-[#c29b40]/20 rounded-xl w-fit">
                  {etape.icon}
                </div>
                <h3 className="text-lg font-serif text-[#1a120b] font-medium">{etape.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{etape.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. SECTION NOS UNIVERS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[#c29b40] text-xs uppercase tracking-widest font-semibold block">Inspirations</span>
            <h2 className="text-3xl font-serif text-[#1a120b]">Nos Univers d'Exception</h2>
            <div className="h-[1px] w-12 bg-[#c29b40] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UNIVERS.map((univer) => (
              <div key={univer.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={univer.image} 
                    alt={univer.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif text-[#1a120b] group-hover:text-[#c29b40] transition-colors">
                    {univer.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {univer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. SECTION ENGAGEMENT (BANDEAU CITATION) */}
      <section className="py-16 bg-[#1a120b] text-white text-center px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <Heart className="text-[#c29b40] mx-auto" size={28} />
          <p className="text-lg md:text-xl font-serif italic text-gray-200 leading-relaxed">
            "Chaque amande est sélectionnée à la main, chaque goutte d'eau de fleur d'oranger est distillée de manière artisanale. Pour vos grands événements, nous ne laissons aucune place au hasard."
          </p>
          <div className="h-[1px] w-16 bg-[#c29b40] mx-auto pt-2"></div>
        </div>
        <div className="absolute inset-0 bg-[#c29b40]/5 opacity-30 blur-3xl pointer-events-none"></div>
      </section>


      {/* 5. SECTION FORMULAIRE DE DEVIS */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto bg-[#fdfaf5] p-8 md:p-12 rounded-3xl border border-[#c29b40]/10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-serif text-[#1a120b]">Demande de Devis Personnalisé</h2>
            <p className="text-xs text-gray-500 font-light">Notre service événementiel vous répondra sous 24h avec une proposition sur-mesure.</p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-4"
            >
              <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium">Votre demande a été reçue !</h4>
                <p className="text-sm text-emerald-700 font-light mt-1">
                  Merci de faire confiance à Allo Lhalawa. Un conseiller dédié va étudier votre projet et vous recontacter très rapidement.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleDevisSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Nom complet</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" placeholder="Votre nom" />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Téléphone (WhatsApp)</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" placeholder="+212 6..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Type d'Événement</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] cursor-pointer appearance-none">
                    <option>Mariage / Fiançailles</option>
                    <option>Baptême / Naissance (Akika)</option>
                    <option>Réception Privée / Fête</option>
                    <option>Événement d'Entreprise / Cadeaux Pro</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Date prévue de l'événement</label>
                  <input type="date" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Nombre d'invités estimé</label>
                <input type="number" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" placeholder="Ex: 150 personnes" />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Décrivez vos souhaits (Pâtisseries, Présentoirs...)</label>
                <textarea rows={4} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors resize-none" placeholder="Ex: Je souhaite un assortiment de 300 pièces présenté sur des plateaux cuivrés traditionnels..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[#c29b40] hover:bg-[#1a120b] text-white py-4 rounded-lg flex items-center justify-center gap-3 transition-colors duration-300 uppercase tracking-widest text-xs font-medium">
                Soumettre ma demande de devis <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}