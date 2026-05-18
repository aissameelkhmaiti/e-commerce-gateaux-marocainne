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
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Scale, CheckCircle2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, useCart } from "../context/CartContext";

const PRODUCTS: Product[] = [
  { id: "p1", name: "Corne de Gazelle", price: 160, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400" },
  { id: "p2", name: "Chebakia Miel", price: 80, image: "https://www.lodj.ma/photo/art/grande/56761313-42196923.jpg?v=1622550757" },
  { id: "p3", name: "Ghriba Amande", price: 120, image: "https://patisseriegato.ma/wp-content/uploads/2023/08/chebakia-histoire.webp" },
  { id: "p4", name: "Briouate Amande", price: 150, image: "https://www.la-cuisine-marocaine.com/photos-recettes/briouates-amandes-miel.jpg" },
];

interface ProductCardProps {
  product: Product;
  onInstantAdd: (p: Product) => void;
  isOverlay?: boolean;
}

// Composant de carte UI pure avec animations Framer Motion intégrées
function ProductCard({ product, onInstantAdd, isOverlay = false }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={!isOverlay ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isOverlay ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative bg-white rounded-3xl p-2 border-2 transition-colors duration-300 group ${
        isOverlay 
          ? "shadow-2xl scale-105 border-[#c29b40] pointer-events-none w-72" 
          : "border-transparent hover:border-[#e8d5b5] shadow-sm"
      }`}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
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
      </div>
      <div className="mt-3 px-2 pb-2 text-center">
        <h3 className="font-serif text-[#5d4037] font-bold text-sm uppercase tracking-wide">{product.name}</h3>
        <p className="text-[#8b5e34] font-medium text-xs mt-1">{product.price} DH / Kg</p>
      </div>
    </motion.div>
  );
}

function DraggableProduct({ product, onInstantAdd, index }: { product: Product; onInstantAdd: (p: Product) => void; index: number }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: product,
  });

  const style = { 
    transform: CSS.Translate.toString(transform),
    touchAction: "none"
  };

  // Animation d'entrée en cascade (Staggered fade-in)
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      {...listeners}
      {...attributes}
      className={`lg:cursor-grab lg:active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
    >
      <ProductCard product={product} onInstantAdd={onInstantAdd} />
    </motion.div>
  );
}

function DropZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "cart-zone" });

  return (
    <motion.div
      ref={setNodeRef}
      animate={{
        borderColor: isOver ? "#c29b40" : "#e8d5b5",
        backgroundColor: isOver ? "rgba(194, 155, 64, 0.1)" : "rgba(255, 255, 255, 0.4)",
        scale: isOver ? 1.03 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[300px] lg:h-[400px] w-full rounded-[2.5rem] border-4 border-dashed flex flex-col items-center justify-center"
    >
      <motion.div 
        animate={{ 
          scale: isOver ? 1.15 : 1,
          rotate: isOver ? [0, -10, 10, 0] : 0,
          backgroundColor: isOver ? "#c29b40" : "#ffffff",
          color: isOver ? "#ffffff" : "#8b5e34"
        }}
        transition={{ 
          rotate: isOver ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : { duration: 0.3 },
          default: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className="p-8 rounded-full shadow-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOver ? "checked" : "scale"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
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

export default function ShopPage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-2"
            >
              <span className="text-[#c29b40] font-bold tracking-[0.2em] uppercase text-xs">Artisanat Marocain</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#5d4037]">Nos Délices</h1>
              <p className="text-[#8b5e34] max-w-md hidden lg:block">Sélectionnez les meilleures pâtisseries, glissez-les dans la zone de pesée.</p>
              <p className="text-[#8b5e34] max-w-md lg:hidden">Sélectionnez vos pâtisseries préférées et ajoutez-les d'un simple clic.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {PRODUCTS.map((product, index) => (
                <DraggableProduct 
                  key={product.id} 
                  product={product} 
                  onInstantAdd={addToCart}
                  index={index}
                />
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center w-full"
          >
            <DropZone />
          </motion.div>
        </div>

        <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {activeProduct ? (
            <ProductCard product={activeProduct} onInstantAdd={addToCart} isOverlay={true} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}