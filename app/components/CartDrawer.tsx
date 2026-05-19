"use client";

import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion"; // Importation de Framer Motion
import { useRouter } from "next/navigation"; // 1. Importation du routeur Next.js

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const router = useRouter(); // 2. Initialisation du routeur

  // 3. Fonction pour gérer la redirection
  const handleCheckout = () => {
    onClose(); // Ferme le panier
    router.push("/checkout"); // Redirige vers la page de paiement (adaptez le chemin si nécessaire, ex: /panier ou /payment)
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Overlay / Fond sombre animé */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose} 
          />

          {/* Contenu du Drawer animé */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative h-full w-full max-w-md bg-[#fdfaf5] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#e8d5b5] flex items-center justify-between bg-white">
              <h2 className="text-xl font-serif font-bold text-[#5d4037]">Votre Sélection</h2>
              <button onClick={onClose} className="p-2 hover:bg-[#fdfaf5] rounded-full transition-colors">
                <X size={24} className="text-[#8b5e34]" />
              </button>
            </div>

            {/* Zone des articles */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[#8b5e34] mt-10 italic"
                  >
                    Votre panier est vide
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout // Permet aux autres éléments de remonter fluidement si un item est supprimé
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 50, transition: { duration: 0.2 } }}
                      className="flex gap-4 bg-white p-4 rounded-2xl border border-[#e8d5b5]/30 shadow-sm"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-[#e8d5b5]" />
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-[#5d4037] text-sm uppercase">{item.name}</h3>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-[#e8d5b5] rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                              className="px-2 py-1 bg-[#fdfaf5] hover:bg-[#e8d5b5] text-[#8b5e34] transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-12 text-center text-sm font-bold text-[#5d4037]">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                              className="px-2 py-1 bg-[#fdfaf5] hover:bg-[#e8d5b5] text-[#8b5e34] transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#8b5e34]">KG</span>
                        </div>

                        <div className="flex justify-between items-end mt-3">
                          <span className="font-bold text-[#c29b40] text-lg">
                            {(item.price * item.quantity).toFixed(2)} DH
                          </span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer fixe du panier */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-[#e8d5b5] space-y-4">
                <div className="flex justify-between items-center text-[#5d4037]">
                  <span className="font-serif text-lg">Total Estimé</span>
                  {/* Animation légère du prix total lorsqu'il change */}
                  <motion.span 
                    key={total}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-[#c29b40]"
                  >
                    {total.toFixed(2)} DH
                  </motion.span>
                </div>
                
                {/* 4. Ajout du onClick sur le bouton */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#8b5e34] hover:bg-[#5d4037] text-white py-4 rounded-sm flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm font-bold active:scale-[0.99]"
                >
                  Finaliser la commande <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}