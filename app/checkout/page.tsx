"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cartItems, total } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // État pour suivre le mode de paiement choisi ("cod" = Cash on Delivery, "card" = Carte)
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#fdfaf5] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl border border-[#e8d5b5] shadow-xl max-w-md w-full text-center space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 size={64} className="text-[#c29b40]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#5d4037]">Paiement Réussi !</h1>
          <p className="text-[#8b5e34] text-sm">
            Merci pour votre achat. Votre paiement a été traité de manière sécurisée et votre commande est validée.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="w-full bg-[#8b5e34] hover:bg-[#5d4037] text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs transition-colors"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#5d4037] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#8b5e34] hover:text-[#5d4037] mb-8 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Retour au shopping
        </button>

        <h1 className="text-3xl font-serif font-bold mb-10 border-b border-[#e8d5b5] pb-4">Finaliser votre commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulaire gauche */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            
            {/* 1. Adresse de livraison */}
            <div className="bg-white p-6 rounded-2xl border border-[#e8d5b5]/40 shadow-sm space-y-4">
              <h2 className="text-lg font-serif font-bold flex items-center gap-2 text-[#8b5e34]">
                <Truck size={20} /> 1. Adresse de livraison
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Prénom</label>
                  <input required type="text" className="w-full p-3 bg-[#fdfaf5] border border-[#e8d5b5] rounded-xl focus:outline-none focus:border-[#8b5e34] text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Nom</label>
                  <input required type="text" className="w-full p-3 bg-[#fdfaf5] border border-[#e8d5b5] rounded-xl focus:outline-none focus:border-[#8b5e34] text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Adresse complète</label>
                <input required type="text" placeholder="Rue, numéro, appartement..." className="w-full p-3 bg-[#fdfaf5] border border-[#e8d5b5] rounded-xl focus:outline-none focus:border-[#8b5e34] text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Ville</label>
                  <input required type="text" placeholder="Ex: Casablanca" className="w-full p-3 bg-[#fdfaf5] border border-[#e8d5b5] rounded-xl focus:outline-none focus:border-[#8b5e34] text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Téléphone</label>
                  <input required type="tel" placeholder="0600000000" className="w-full p-3 bg-[#fdfaf5] border border-[#e8d5b5] rounded-xl focus:outline-none focus:border-[#8b5e34] text-sm" />
                </div>
              </div>
            </div>

            {/* 2. Mode de Paiement */}
            <div className="bg-white p-6 rounded-2xl border border-[#e8d5b5]/40 shadow-sm space-y-4">
              <h2 className="text-lg font-serif font-bold flex items-center gap-2 text-[#8b5e34]">
                <CreditCard size={20} /> 2. Mode de paiement
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Cash on delivery */}
                <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "cod" ? "border-[#8b5e34] bg-[#fdfaf5]" : "border-[#e8d5b5]/60 bg-white"}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "cod"} 
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#8b5e34]" 
                    />
                    <span className="text-sm font-bold">Paiement à la livraison</span>
                  </div>
                </label>
                
                {/* Option 2: Carte Bancaire */}
                <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "card" ? "border-[#8b5e34] bg-[#fdfaf5]" : "border-[#e8d5b5]/60 bg-white"}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "card"} 
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#8b5e34]" 
                    />
                    <span className="text-sm font-bold">Carte Bancaire</span>
                  </div>
                </label>
              </div>

              {/* Formulaire de Carte Statique (Apparaît si paymentMethod === 'card') */}
              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-4 border-t border-[#e8d5b5]/40 space-y-4"
                  >
                    <div className="bg-[#fdfaf5] p-4 rounded-xl border border-[#e8d5b5] space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Nom sur la carte</label>
                        <input required={paymentMethod === "card"} type="text" placeholder="M. Mohamed Alami" className="w-full p-2.5 bg-white border border-[#e8d5b5] rounded-lg focus:outline-none focus:border-[#8b5e34] text-sm" />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Numéro de carte</label>
                        <div className="relative">
                          <input required={paymentMethod === "card"} type="text" maxLength={19} placeholder="4000 1234 5678 9010" className="w-full p-2.5 pr-10 bg-white border border-[#e8d5b5] rounded-lg focus:outline-none focus:border-[#8b5e34] text-sm" />
                          <Lock size={16} className="absolute right-3 top-3.5 text-[#8b5e34]/50" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Date d'expiration</label>
                          <input required={paymentMethod === "card"} type="text" maxLength={5} placeholder="MM/AA" className="w-full p-2.5 bg-white border border-[#e8d5b5] rounded-lg focus:outline-none focus:border-[#8b5e34] text-sm text-center" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#8b5e34]">Code CVC</label>
                          <input required={paymentMethod === "card"} type="text" maxLength={3} placeholder="123" className="w-full p-2.5 bg-white border border-[#e8d5b5] rounded-lg focus:outline-none focus:border-[#8b5e34] text-sm text-center" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button type="submit" className="w-full bg-[#c29b40] hover:bg-[#201b0e] text-white py-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-widest text-sm font-bold shadow-md">
              <ShieldCheck size={18} /> {paymentMethod === "card" ? "Payer le montant" : "Confirmer la commande"}
            </button>
          </form>
 
          {/* Résumé droit (Inchangé) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#e8d5b5]/40 shadow-sm lg:sticky lg:top-6 space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#5d4037] border-b border-[#e8d5b5]/60 pb-3">Récapitulatif</h2>
            <div className="divide-y divide-[#e8d5b5]/40 max-h-64 overflow-y-auto pr-2 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-[#e8d5b5]" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs uppercase text-[#5d4037] truncate">{item.name}</h4>
                    <p className="text-xs text-[#8b5e34] mt-0.5">{item.quantity} KG</p>
                  </div>
                  <span className="font-bold text-[#c29b40] text-sm">{(item.price * item.quantity).toFixed(2)} DH</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e8d5b5]/60 pt-4 space-y-2 text-sm text-[#8b5e34]">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-[#5d4037]">{total.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="font-semibold text-green-600">Gratuit</span>
              </div>
              <div className="flex justify-between items-center text-[#5d4037] pt-4 border-t border-[#e8d5b5] font-serif">
                <span className="text-lg font-bold">Total à payer</span>
                <span className="text-2xl font-bold text-[#c29b40]">{total.toFixed(2)} DH</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}