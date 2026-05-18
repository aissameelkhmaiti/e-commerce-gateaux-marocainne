"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire (API, EmailJS, etc.)
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="min-h-screen bg-[#fdfaf5] py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la page */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#c29b40] uppercase tracking-[0.2em] font-medium text-xs block">
            À votre écoute
          </span>
          <h1 className="text-4xl lg:text-6xl font-serif text-[#1a120b] leading-tight">
            Contactez <span className="italic text-[#c29b40]">Allo Lhalawa</span>
          </h1>
          <div className="h-[1px] w-20 bg-[#c29b40] mx-auto my-4"></div>
          <p className="text-sm text-gray-600 font-light max-w-md mx-auto">
            Une question sur vos commandes, besoin d'un devis sur-mesure pour un événement ? Notre équipe est là pour vous accompagner.
          </p>
        </div>

        {/* Grille Principale (Formulaire + Infos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Colonne Gauche : Formulaire de Contact */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-serif text-[#1a120b] mb-6">Envoyez-nous un message</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-4"
              >
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-medium">Message envoyé avec succès !</h4>
                  <p className="text-sm text-emerald-700 font-light mt-1">
                    Merci pour votre intérêt. Notre équipe prendra soin de vous répondre sous 24h.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Nom complet</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm text-[#1a120b] focus:outline-none focus:border-[#c29b40] transition-colors"
                      placeholder="Ex: Amine Benjelloun"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Téléphone</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm text-[#1a120b] focus:outline-none focus:border-[#c29b40] transition-colors"
                      placeholder="Ex: +212 600 000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Adresse e-mail</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm text-[#1a120b] focus:outline-none focus:border-[#c29b40] transition-colors"
                    placeholder="Ex: contact@exemple.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Sujet de votre demande</label>
                  <select className="w-full px-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm text-[#1a120b] focus:outline-none focus:border-[#c29b40] transition-colors appearance-none cursor-pointer">
                    <option>Question sur une commande en cours</option>
                    <option>Devis pour un événement / mariage</option>
                    <option>Partenariat ou commande pro</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Votre message</label>
                  <textarea 
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm text-[#1a120b] focus:outline-none focus:border-[#c29b40] transition-colors resize-none"
                    placeholder="Décrivez votre besoin en détail..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#c29b40] hover:bg-[#1a120b] text-white py-4 rounded-lg flex items-center justify-center gap-3 transition-colors duration-300 uppercase tracking-widest text-xs font-medium shadow-sm"
                >
                  Envoyer la demande <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Colonne Droite : Informations pratiques & Carte */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Boîte d'informations */}
            <div className="bg-[#1a120b] text-white p-8 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c29b40]/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-xl font-serif text-[#c29b40]">Atelier Allo Lhalawa</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#c29b40] shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 font-medium">Adresse</h5>
                    <p className="text-sm font-light mt-0.5">12 Boulevard Ghandi, Quartier Maârif, Casablanca, Maroc</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-[#c29b40] shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 font-medium">Téléphone & WhatsApp</h5>
                    <p className="text-sm font-light mt-0.5">+212 5 22 00 00 00</p>
                    <p className="text-xs text-[#c29b40] font-light">+212 6 61 00 00 00 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#c29b40] shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 font-medium">E-mail</h5>
                    <p className="text-sm font-light mt-0.5">contact@allolhalawa.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#c29b40] shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 font-medium">Horaires d'ouverture</h5>
                    <p className="text-sm font-light mt-0.5">Lundi - Samedi : 09:00 – 20:00</p>
                    <p className="text-sm font-light">Dimanche : 09:00 – 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Intégration de la Map (Iframe Google Maps stylisée) */}
            <div className="w-full h-[280px] rounded-2xl overflow-hidden border border-gray-200 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8465492440934!2d-7.6433!3d33.5851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzA2LjQiTiA3wrAzOCczNS45Ilc!5e0!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}