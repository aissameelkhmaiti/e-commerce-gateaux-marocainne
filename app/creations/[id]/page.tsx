"use client";

import { useState, use } from "react"; // 1. Importer 'use' de React
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Minus, Plus, Star, ShieldCheck } from "lucide-react";
import { useCart, Product } from "../../context/CartContext";

// Simulation de la base de données
const PRODUCTS: Product[] = [
  { id: "p1", name: "Corne de Gazelle", price: 160, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400" },
  { id: "p2", name: "Chebakia Miel", price: 80, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757" },
  { id: "p3", name: "Ghriba Amande", price: 120, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp" },
  { id: "p4", name: "Briouate Amande", price: 150, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg" },
];

// 2. Définir le type des params comme une Promise
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart, updateQuantity } = useCart();
  
  // 3. Déballer les params de manière réactive et moderne avec React.use()
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  
  // Récupérer le produit correspondant à l'ID
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(0.5, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(product);
    if (updateQuantity) {
      updateQuantity(product.id, quantity);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#5d4037] py-8 md:py-16 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#8b5e34] hover:text-[#5d4037] mb-8 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={18} /> Retour aux délices
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#e8d5b5]/40 shadow-sm">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden border border-[#e8d5b5]/60 shadow-inner"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-[#c29b40] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Recette Traditionnelle
            </span>
          </motion.div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs block">
                Pâtisserie Fine Marocaine
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5d4037]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-1 text-[#c29b40] pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#c29b40" />
                ))}
                <span className="text-xs text-[#8b5e34] font-medium ml-2">(4.9/5 Avis Clients)</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-[#c29b40] border-b border-[#e8d5b5]/40 pb-4">
              {product.price} DH <span className="text-sm font-sans text-[#8b5e34] font-normal">/ Le Kilogramme</span>
            </div>

            <p className="text-sm text-[#8b5e34] leading-relaxed">
              Façonné à la main par nos artisans pâtissiers. Nous sélectionnons rigoureusement des amandes locales de premier choix, infusées à l'eau de fleur d'oranger pure et enrobées d'un miel naturel filtré. Une douceur authentique pour accompagner vos moments précieux.
            </p>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#8b5e34]">
                Choisir la quantité désirée :
              </label>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#e8d5b5] rounded-xl overflow-hidden bg-[#fdfaf5]">
                  <button 
                    onClick={() => handleQuantityChange(-0.5)}
                    className="px-4 py-3 hover:bg-[#e8d5b5]/50 text-[#8b5e34] transition-colors active:scale-95"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-16 text-center text-base font-bold text-[#5d4037]">
                    {quantity} <span className="text-xs font-medium text-[#8b5e34]">KG</span>
                  </span>
                  <button 
                    onClick={() => handleQuantityChange(0.5)}
                    className="px-4 py-3 hover:bg-[#e8d5b5]/50 text-[#8b5e34] transition-colors active:scale-95"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-xs text-[#8b5e34] italic">
                  Total estimé : <span className="font-bold text-[#c29b40] text-sm">{(product.price * quantity).toFixed(2)} DH</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm font-bold shadow-md text-white ${
                  isAdded 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-[#8b5e34] hover:bg-[#5d4037]"
                }`}
              >
                <ShoppingBag size={18} />
                {isAdded ? "Ajouté avec succès !" : "Ajouter au panier"}
              </motion.button>
            </div>

            <div className="pt-4 border-t border-[#e8d5b5]/40 grid grid-cols-2 gap-4 text-xs text-[#8b5e34]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#c29b40]" />
                <span>Fraîcheur 100% Garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#c29b40]" />
                <span>Emballage Soigné</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}