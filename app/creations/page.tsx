"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  useDraggable,
  useDroppable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Scale,
  CheckCircle2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, useCart } from "../context/CartContext";

interface StoreProduct extends Product {
  category: "miel" | "amande" | "sable";
}

const ALL_PRODUCTS: StoreProduct[] = [
  { id: "p1", name: "Corne de Gazelle", price: 160, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "amande" },
  { id: "p2", name: "Ghriba Amande", price: 120, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "amande" },
  { id: "p3", name: "Briouate Amande", price: 150, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "amande" },
  { id: "p4", name: "M'hancha Amande", price: 180, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "amande" },
  { id: "p5", name: "Chebakia Miel", price: 80, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757", category: "miel" },
  { id: "p6", name: "Makrout Miel", price: 90, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "miel" },
  { id: "p7", name: "Baklava Miel", price: 140, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "miel" },
  { id: "p8", name: "Chorba au Miel", price: 85, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757", category: "miel" },
  { id: "p9", name: "Sablé Confiture", price: 70, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "sable" },
  { id: "p10", name: "Sablé Caramel", price: 75, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", category: "sable" },
  { id: "p11", name: "Ghriba Noix", price: 110, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp", category: "sable" },
  { id: "p12", name: "Fekkas Traditionnel", price: 65, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg", category: "sable" },
];

const ITEMS_PER_PAGE = 4;

/* ==========================================================================
   Composant Carte Produit (Avec Redirection & Bouton d'Achat Direct)
   ========================================================================== */
interface ProductCardProps {
  product: Product;
  onInstantAdd: (p: Product) => void;
  isOverlay?: boolean;
}

function ProductCard({ product, onInstantAdd, isOverlay = false }: ProductCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={!isOverlay ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isOverlay ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={() => {
        if (!isOverlay) {
          router.push(`/creations/${product.id}`);
        }
      }}
      className={`relative bg-white rounded-3xl p-2 border-2 transition-colors duration-300 group cursor-pointer ${
        isOverlay
          ? "shadow-2xl scale-105 border-[#c29b40] pointer-events-none w-64"
          : "border-transparent hover:border-[#e8d5b5] shadow-sm"
      }`}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Bouton Mobile Action Directe */}
        {!isOverlay && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onInstantAdd(product);
            }}
            className="absolute bottom-2 right-2 lg:hidden bg-[#c29b40] text-white p-2 rounded-full shadow-lg z-10"
            title="Ajouter au panier"
          >
            <Plus size={18} />
          </motion.button>
        )}

        {/* Bouton Desktop Action Directe (Affiché au survol) */}
        {!isOverlay && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onInstantAdd(product);
              }}
              className="bg-[#c29b40] hover:bg-[#a88232] text-white p-3 rounded-full shadow-xl flex items-center justify-center gap-2 font-medium text-xs uppercase tracking-wider"
              title="Ajouter au panier"
            >
              <ShoppingCart size={16} />
              <span>Acheter</span>
            </motion.button>
          </div>
        )}
      </div>

      <div className="mt-3 px-2 pb-2 text-center">
        <h3 className="font-serif text-[#5d4037] font-bold text-sm uppercase tracking-wide truncate group-hover:text-[#c29b40] transition-colors">
          {product.name}
        </h3>
        <p className="text-[#8b5e34] font-medium text-xs mt-1">
          {product.price} DH / Kg
        </p>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   Composant Enveloppe Draggable
   ========================================================================== */
function DraggableProduct({ product, onInstantAdd }: { product: Product; onInstantAdd: (p: Product) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: product,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`lg:cursor-grab lg:active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
    >
      <ProductCard product={product} onInstantAdd={onInstantAdd} />
    </div>
  );
}

/* ==========================================================================
   Composant Zone de Dépôt (DropZone)
   ========================================================================== */
function DropZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: "cart-zone",
  });

  return (
    <motion.div
      ref={setNodeRef}
      animate={{
        borderColor: isOver ? "#c29b40" : "#e8d5b5",
        backgroundColor: isOver ? "rgba(194, 155, 64, 0.1)" : "rgba(255, 255, 255, 0.4)",
        scale: isOver ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[300px] lg:h-[400px] w-full rounded-[2.5rem] border-4 border-dashed flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{
          scale: isOver ? 1.15 : 1,
          rotate: isOver ? [0, -10, 10, 0] : 0,
          backgroundColor: isOver ? "#c29b40" : "#ffffff",
          color: isOver ? "#ffffff" : "#8b5e34",
        }}
        transition={{
          rotate: isOver ? { repeat: Infinity, duration: 1.5, ease: "linear" } : { duration: 0.3 },
          default: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="p-8 rounded-full shadow-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOver ? "checked" : "scale"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            {isOver ? <CheckCircle2 size={48} /> : <Scale size={48} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 text-center px-6">
        <h2 className="text-2xl font-serif text-[#5d4037] font-bold">
          {isOver ? "Lâchez pour ajouter" : "Zone de Pesée"}
        </h2>
        <p className="text-[#8b5e34] mt-2 text-sm italic">Glissez vos douceurs ici</p>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   Composant Principal (ShopPage)
   ========================================================================== */
export default function ShopPage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { addToCart } = useCart();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveProduct(event.active.data.current as Product);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id === "cart-zone") {
      addToCart(active.data.current as Product);
    }
    setActiveProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] p-4 md:p-12 font-sans select-none overflow-x-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Section de gauche : Catalogue */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs">
                Artisanat Marocain
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#5d4037]">Nos Délices</h1>
              <p className="text-[#8b5e34] max-w-md hidden lg:block">
                Sélectionnez les meilleures pâtisseries, glissez-les dans la zone de pesée ou cliquez pour voir les détails.
              </p>
              <p className="text-[#8b5e34] max-w-md lg:hidden">
                Sélectionnez vos pâtisseries préférées et ajoutez-les d'un simple clic.
              </p>
            </div>

            {/* Barre de Recherche */}
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8b5e34]">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Rechercher une pâtisserie..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e8d5b5] rounded-2xl text-sm text-[#5d4037] placeholder-[#8b5e34]/50 focus:outline-none focus:ring-2 focus:ring-[#c29b40] focus:border-transparent transition-all shadow-sm"
              />
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
                    ${
                      selectedCategory === tab.id
                        ? "bg-[#5d4037] text-[#fdfaf5] shadow-md"
                        : "text-[#8b5e34] hover:bg-[#e8d5b5]/30"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grille des produits */}
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
                Aucun produit ne correspond à votre recherche.
              </div>
            )}

            {/* Pagination */}
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
                      ${
                        currentPage === page
                          ? "bg-[#c29b40] text-white shadow-sm"
                          : "bg-white border border-[#e8d5b5] text-[#8b5e34] hover:bg-[#e8d5b5]/20"
                      }`}
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

          {/* Section de droite : DropZone fixe */}
          <div className="hidden lg:flex flex-col items-center w-full lg:sticky lg:top-12">
            <DropZone />
          </div>
        </div>

        {/* Rendu fluide de l'élément pendant le Drag & Drop */}
        <DragOverlay
          dropAnimation={{
            duration: 250,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {activeProduct ? (
            <ProductCard product={activeProduct} onInstantAdd={addToCart} isOverlay={true} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}