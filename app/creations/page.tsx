"use client";

import { useState, useMemo } from "react";
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
import { Scale, CheckCircle2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, useCart } from "../context/CartContext";


// Extension de l'interface Product pour inclure la catégorie si nécessaire
interface StoreProduct extends Product {
  category: "miel" | "amande" | "sable";
}

// Base de données statique complète (12 produits pour tester la pagination et les catégories)
const ALL_PRODUCTS: StoreProduct[] = [
  // Catégorie Amande
  { id: "p1", name: "Corne de Gazelle", price: 160, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "amande" },
  { id: "p2", name: "Ghriba Amande", price: 120, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "amande" },
  { id: "p3", name: "Briouate Amande", price: 150, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "amande" },
  { id: "p4", name: "M'hancha Amande", price: 180, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "amande" },
  
  // Catégorie Miel
  { id: "p5", name: "Chebakia Miel", price: 80, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757", category: "miel" },
  { id: "p6", name: "Makrout Miel", price: 90, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "miel" },
  { id: "p7", name: "Baklava Miel", price: 140, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "miel" },
  { id: "p8", name: "Chorba au Miel", price: 85, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757", category: "miel" },
  
  // Catégorie Sablés / Prestige
  { id: "p9", name: "Sablé Confiture", price: 70, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "sable" },
  { id: "p10", name: "Sablé Caramel", price: 75, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "sable" },
  { id: "p11", name: "Ghriba Noix", price: 110, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "sable" },
  { id: "p12", name: "Fekkas Traditionnel", price: 65, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "sable" },
];

const ITEMS_PER_PAGE = 4; // Nombre de produits par page

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
        
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Bouton d'ajout rapide uniquement sur mobile/tablette */}
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
        <h3 className="font-serif text-[#5d4037] font-bold text-sm uppercase tracking-wide truncate">{product.name}</h3>
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const { addToCart } = useCart();

  // Configuration des capteurs DnD-Kit
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  // 1. Filtrage par catégorie
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Réinitialiser la page si on change de catégorie
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 2. Calcul de la pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Section de gauche : Catalogue de produits */}
          <div className="space-y-8">
            {/* En-tête */}
            <div className="space-y-2">
              <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs">Artisanat Marocain</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#5d4037]">Nos Délices</h1>
              <p className="text-[#8b5e34] max-w-md hidden lg:block">Sélectionnez les meilleures pâtisseries, glissez-les dans la zone de pesée.</p>
              <p className="text-[#8b5e34] max-w-md lg:hidden">Sélectionnez vos pâtisseries préférées et ajoutez-les d'un simple clic.</p>
            </div>

            {/* Barre des Catégories */}
            <div className="flex flex-wrap gap-2 border-b border-[#e8d5b5] pb-4">
              {[
                { id: "all", label: "Tout voir" },
                { id: "amande", label: "Aux Amandes" },
                { id: "miel", label: "Au Miel pur" },
                { id: "sable", label: "Sablés & Prestige" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === tab.id 
                      ? "bg-[#5d4037] text-[#fdfaf5] shadow-md" 
                      : "text-[#8b5e34] hover:bg-[#e8d5b5]/30"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Grille des produits filtrés et paginés */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6">
                {paginatedProducts.map((product) => (
                  <DraggableProduct 
                    key={product.id} 
                    product={product} 
                    onInstantAdd={addToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#8b5e34] italic">
                Aucun produit trouvé dans cette catégorie.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white border border-[#e8d5b5] text-[#5d4037] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e8d5b5]/20 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-all
                      ${currentPage === page 
                        ? "bg-[#c29b40] text-white shadow-sm" 
                        : "bg-white border border-[#e8d5b5] text-[#8b5e34] hover:bg-[#e8d5b5]/20"}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-white border border-[#e8d5b5] text-[#5d4037] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e8d5b5]/20 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Section de droite : Masquée sur mobile (hidden), affichée sur PC (lg:flex) */}
          <div className="hidden lg:flex flex-col items-center w-full lg:sticky lg:top-12">
            <DropZone isOver={activeId !== null} />
          </div>

        </div>
      </DndContext>
    </div>
  );
}