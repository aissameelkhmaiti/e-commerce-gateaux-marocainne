"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Compass,
  Sparkles,
  Truck,
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";

const ETAPES = [
  {
    id: 1,
    icon: <Compass className="text-[#b18a4d]" size={28} />,
    title: "1. La Conception",
    desc: "Choisissez parmi nos variétés de pâtisseries fines (Cornes de gazelle, Chebakia, Fekkas…). Définissez les saveurs, les formats et le nombre de pièces selon vos besoins.",
  },
  {
    id: 2,
    icon: <Sparkles className="text-[#b18a4d]" size={28} />,
    title: "2. La Personnalisation",
    desc: "Sélectionnez le support (plateaux en argent ciselé, coffrets en bois précieux) et les rubans aux couleurs de votre événement. Possibilité de personnaliser le packaging.",
  },
  {
    id: 3,
    icon: <Truck className="text-[#b18a4d]" size={28} />,
    title: "3. La Livraison Événementielle",
    desc: "Nous coordonnons la livraison directement sur le lieu de votre réception partout au Maroc. Nos équipes veillent à un dressage esthétique et d'une fraîcheur irréprochable.",
  },
];

const UNIVERS = [
  {
    id: 1,
    title: "Mariages & Fiançailles",
    desc: "Des pièces montées traditionnelles et des plateaux d'amandes raffinés pour célébrer l'amour dans la plus pure tradition marocaine.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Naissances & Baptêmes",
    desc: "Des coffrets délicats (Akika) et des douceurs personnalisées pour célébrer la vie et accueillir vos proches avec la plus grande tendresse.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Corporate & Cadeaux d'Affaires",
    desc: "Marquez l'esprit de vos partenaires, clients ou collaborateurs avec des coffrets de prestige logotés aux couleurs de votre entreprise.",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
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
    <div className="bg-[#fcf8f2] min-h-screen font-sans text-[#1c140e]">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover brightness-[0.45]"
            alt="sur mesure"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf8f2] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 space-y-4">
          <span className="text-[#b18a4d] uppercase tracking-[0.3em] text-xs font-semibold">
            L'excellence pour vos grands moments
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
            Vos Créations <span className="italic text-[#b18a4d]">Sur-Mesure</span>
          </h1>
          <p className="text-gray-200 font-light max-w-xl mx-auto text-sm md:text-base">
            Mariage, fiançailles, baptême ou réception d'entreprise. Nous donnons vie à vos exigences les plus gourmandes.
          </p>
        </div>
      </section>

      {/* ETAPES */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif text-[#1c140e]">Comment ça marche ?</h2>
          <div className="w-16 h-[2px] bg-[#b18a4d] mx-auto mt-4" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {ETAPES.map((e) => (
            <div key={e.id} className="p-6 text-center md:text-left space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-center md:justify-start mb-2">{e.icon}</div>
              <h3 className="font-serif text-xl text-[#1c140e]">{e.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {UNIVERS.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="h-64 overflow-hidden">
                <img
                  src={u.image}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  alt={u.title}
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl text-[#1c140e]">{u.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION CONTACT & FORMULAIRE (Layout fidèle à l'image) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* BLOC GAUCHE : FORMULAIRE */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif text-[#1c140e] mb-2">Envoyez-nous un message</h2>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-8">Sujet de votre demande</p>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3"
              >
                <CheckCircle2 className="text-emerald-600 shrink-0" />
                <div>
                  <p className="font-medium text-emerald-900">Demande envoyée avec succès</p>
                  <p className="text-sm text-emerald-700 mt-1">
                    Merci pour votre intérêt. Notre équipe de l'Atelier vous répondra sous 24h.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleDevisSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Nom Complet</label>
                    <input
                      type="text"
                      placeholder="Ex: Amine Benjelloun"
                      className="w-full p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b18a4d] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Téléphone</label>
                    <input
                      type="tel"
                      placeholder="Ex: +212 600 000000"
                      className="w-full p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b18a4d] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Adresse E-mail</label>
                  <input
                    type="email"
                    placeholder="Ex: contact@exemple.com"
                    className="w-full p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b18a4d] transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Sujet de votre demande</label>
                  <select className="w-full p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b18a4d] transition-colors text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a0aec0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat">
                    <option>Question sur une commande en cours</option>
                    <option>Demande de devis événementiel (Mariage, Fiançailles)</option>
                    <option>Cadeaux d'affaires & Corporate</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Votre Message</label>
                  <textarea
                    className="w-full p-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b18a4d] transition-colors resize-none"
                    rows={5}
                    placeholder="Décrivez votre besoin en détail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c29b40] hover:bg-[#201b0e] text-white py-4 font-medium rounded-xl flex justify-center items-center gap-2 text-xs uppercase tracking-widest transition-colors shadow-sm"
                >
                  Envoyer la demande <Send size={14} className="ml-1" />
                </button>
              </form>
            )}
          </div>

          {/* BLOC DROITE : INFOS ATELIER & MAPS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Infos Pratiques (Boîte Noire) */}
            <div className="bg-[#1c140e] text-white p-8 rounded-[24px] space-y-6">
              <h3 className="text-xl font-serif text-[#b18a4d]">Atelier Allo Lhalawa</h3>
              
              <div className="space-y-5 text-sm font-light">
                <div className="flex gap-4">
                  <MapPin className="text-[#b18a4d] shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-0.5">Adresse</p>
                    <p className="text-gray-300 leading-relaxed">12 Boulevard Ghandi, Quartier Maârif, Casablanca, Maroc</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[#b18a4d] shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-0.5">Téléphone & Whatsapp</p>
                    <p className="text-[#b18a4d] font-semibold text-base">+212 5 22 00 00 00</p>
                    <p className="text-gray-400 text-xs">+212 6 61 00 00 00 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-[#b18a4d] shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-0.5">E-mail</p>
                    <a href="mailto:contact@allolhalawa.ma" className="text-gray-300 hover:text-[#b18a4d] transition-colors underline underline-offset-4">
                      contact@allolhalawa.ma
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="text-[#b18a4d] shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-0.5">Horaires d'ouverture</p>
                    <p className="text-gray-300"><span className="font-medium text-white">Lundi - Samedi :</span> 09:00 – 20:00</p>
                    <p className="text-gray-300"><span className="font-medium text-white">Dimanche :</span> 09:00 – 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fausse Carte Google Maps fidèle */}
            <div className="relative bg-white border border-gray-200 rounded-[24px] overflow-hidden h-64 shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                alt="Map Ghandi Casablanca" 
                className="w-full h-full object-cover opacity-80 filter grayscale"
              />
              {/* Pin de localisation simulé au centre */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-bounce">
                  <MapPin size={36} className="text-[#1c140e] fill-[#b18a4d]" />
                </div>
              </div>
              {/* Bouton Ouvrir dans Maps */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="absolute top-4 left-4 bg-white/90 hover:bg-white text-xs font-medium text-gray-800 px-3 py-2 rounded-lg shadow-sm flex items-center gap-1.5 backdrop-blur-sm transition-colors"
              >
                Ouvrir dans Maps <ExternalLink size={12} />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}