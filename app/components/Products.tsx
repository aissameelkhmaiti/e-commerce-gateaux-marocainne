"use client";

import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Scale, CheckCircle2, Plus } from "lucide-react";
import { Product, useCart } from "../context/CartContext";

const PRODUCTS: Product[] = [
  { id: "p1", name: "Corne de Gazelle", price: 160, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400" },
  { id: "p2", name: "Chebakia Miel", price: 80, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757" },
  { id: "p3", name: "Ghriba Amande", price: 120, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp" },
  { id: "p4", name: "Briouate Amande", price: 150, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg" },
];

function DraggableProduct({ product, onInstantAdd }: { product: Product; onInstantAdd: (p: Product) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: product,
  });

  const style = { 
    transform: CSS.Translate.toString(transform),
    touchAction: "none"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative bg-white rounded-3xl p-2 border-2 transition-all duration-300 lg:cursor-grab lg:active:cursor-grabbing group 
        ${isDragging ? "shadow-2xl scale-105 z-50 border-[#c29b40]" : "border-transparent hover:border-[#e8d5b5] shadow-sm"}`}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Bouton d'ajout rapide visible UNIQUEMENT sur mobile/tablette (caché sur lg) */}
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onInstantAdd(product);
          }}
          className="absolute bottom-2 right-2 lg:hidden bg-[#c29b40] text-white p-2 rounded-full shadow-lg active:scale-95 transition-transform z-10"
          title="Ajouter au panier"
        >
          
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-3 px-2 pb-2 text-center">
        <h3 className="font-serif text-[#5d4037] font-bold text-sm uppercase tracking-wide">{product.name}</h3>
        <p className="text-[#8b5e34] font-medium text-xs mt-1">{product.price} DH / Kg</p>
      </div>
    </div>
  );
}

function DropZone({ isOver }: { isOver: boolean }) {
  const { setNodeRef } = useDroppable({ id: "cart-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`relative h-[300px] lg:h-[400px] w-full rounded-[2.5rem] border-4 border-dashed flex flex-col items-center justify-center transition-all duration-500
        ${isOver ? "border-[#c29b40] bg-[#c29b40]/10" : "border-[#e8d5b5] bg-white/40"}`}
    >
      <div className={`p-8 rounded-full transition-all duration-500 ${isOver ? "bg-[#c29b40] text-white" : "bg-white text-[#8b5e34] shadow-xl"}`}>
        {isOver ? <CheckCircle2 size={48} /> : <Scale size={48} />}
      </div>
      <div className="mt-6 text-center px-6">
        <h2 className="text-2xl font-serif text-[#5d4037] font-bold">{isOver ? "Lâchez pour ajouter" : "Zone de Pesée"}</h2>
        <p className="text-[#8b5e34] mt-2 text-sm italic">Glissez vos douceurs ici</p>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id === "cart-zone") {
      addToCart(active.data.current as Product);
    }
    setActiveId(null);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] p-4 md:p-12 font-sans">
      <DndContext sensors={sensors} onDragStart={(e) => setActiveId(e.active.id as string)} onDragEnd={handleDragEnd}>
        {/* Changement ici : grid-cols-1 par défaut, grid-cols-2 uniquement sur grand écran (lg) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs">Artisanat Marocain</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#5d4037]">Nos Délices</h1>
              {/* Le texte s'adapte aussi selon le support */}
              <p className="text-[#8b5e34] max-w-md hidden lg:block">Sélectionnez les meilleures pâtisseries, glissez-les dans la zone de pesée.</p>
              <p className="text-[#8b5e34] max-w-md lg:hidden">Sélectionnez vos pâtisseries préférées et ajoutez-les d'un simple clic.</p>
            </div>
            
            {/* Grille de produits : passe de 2 à 3 colonnes sur écran moyen (md) si besoin, ou reste propre sur mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6">
              {PRODUCTS.map((product) => (
                <DraggableProduct 
                  key={product.id} 
                  product={product} 
                  onInstantAdd={addToCart} 
                />
              ))}
            </div>
          </div>

          {/* Modification majeure ici : caché sur mobile (hidden) et s'affiche sur grand écran (lg:flex) */}
          <div className="hidden lg:flex flex-col items-center w-full">
            <DropZone isOver={activeId !== null} />
          </div>

        </div>
      </DndContext>
    </div>
  );
}