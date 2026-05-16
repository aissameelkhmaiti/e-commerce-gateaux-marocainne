"use client";

import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}>
      {/* Overlay / Fond sombre */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} 
        onClick={onClose} 
      />

      {/* Contenu du Drawer */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#fdfaf5] shadow-2xl transform transition-transform duration-500 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-[#e8d5b5] flex items-center justify-between bg-white">
          <h2 className="text-xl font-serif font-bold text-[#5d4037]">Votre Sélection</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#fdfaf5] rounded-full transition-colors">
            <X size={24} className="text-[#8b5e34]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-[#8b5e34] mt-10 italic">Votre panier est vide</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-[#e8d5b5]/30 shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-[#e8d5b5]" />
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-[#5d4037] text-sm uppercase">{item.name}</h3>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-[#e8d5b5] rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                        className="px-2 py-1 bg-[#fdfaf5] hover:bg-[#e8d5b5] text-[#8b5e34]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-[#5d4037]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                        className="px-2 py-1 bg-[#fdfaf5] hover:bg-[#e8d5b5] text-[#8b5e34]"
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
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer fixe du panier */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e8d5b5] space-y-4">
            <div className="flex justify-between items-center text-[#5d4037]">
              <span className="font-serif text-lg">Total Estimé</span>
              <span className="text-2xl font-bold text-[#c29b40]">{total.toFixed(2)} DH</span>
            </div>
            <button className="w-full bg-[#8b5e34] hover:bg-[#5d4037] text-white py-4 rounded-sm flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm font-bold">
              Finaliser la commande <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}