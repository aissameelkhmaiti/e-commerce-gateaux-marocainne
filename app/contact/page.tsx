"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] py-12 px-4 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* En-tête */}
        <div className="text-center space-y-3">
          <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs">Une question ? Un événement ?</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#5d4037]">Contactez Notre Maison</h1>
          <p className="text-[#8b5e34] max-w-md mx-auto text-sm">
            Que ce soit pour une commande spéciale, un mariage ou une simple envie sucrée, nous vous répondrons avec joie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Informations pratiques (4 colonnes) */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e8d5b5]/40 space-y-8">
            <h2 className="text-2xl font-serif text-[#5d4037] font-bold border-b border-[#e8d5b5] pb-3">
              Informations
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-[#fdfaf5] rounded-2xl text-[#c29b40] h-fit">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5d4037] text-sm">Notre Adresse</h4>
                  <p className="text-xs text-[#8b5e34] mt-1">Quartier Racine, Rue Les Hôpitaux,<br />Casablanca, Maroc</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#fdfaf5] rounded-2xl text-[#c29b40] h-fit">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5d4037] text-sm">Heures d'ouverture</h4>
                  <p className="text-xs text-[#8b5e34] mt-1">Mardi - Dimanche : 09h00 - 20h00<br />Lundi : Fermé</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#fdfaf5] rounded-2xl text-[#c29b40] h-fit">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5d4037] text-sm">Téléphone</h4>
                  <p className="text-xs text-[#8b5e34] mt-1">+212 522 XX XX XX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de Contact (7 colonnes) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e8d5b5]/40">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#c29b40]/10 text-[#c29b40] rounded-full flex items-center justify-center mx-auto">
                  <Send size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#5d4037]">Message envoyé !</h3>
                <p className="text-sm text-[#8b5e34]">Merci pour votre intérêt, notre équipe vous recontactera sous 24h.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#c29b40] underline hover:text-[#5d4037]"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8b5e34]">Nom complet</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#fdfaf5] border border-[#e8d5b5] rounded-2xl px-4 py-3 text-sm text-[#5d4037] focus:outline-none focus:border-[#c29b40] transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8b5e34]">Adresse Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#fdfaf5] border border-[#e8d5b5] rounded-2xl px-4 py-3 text-sm text-[#5d4037] focus:outline-none focus:border-[#c29b40] transition-colors"
                      placeholder="exemple@mail.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b5e34]">Votre message</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#fdfaf5] border border-[#e8d5b5] rounded-2xl px-4 py-3 text-sm text-[#5d4037] focus:outline-none focus:border-[#c29b40] transition-colors resize-none"
                    placeholder="Dites-nous tout..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5d4037] hover:bg-[#c29b40] text-white font-medium py-4 rounded-2xl shadow-md transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <span>Envoyer la demande</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}