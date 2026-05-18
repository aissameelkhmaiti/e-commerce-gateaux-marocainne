"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { totalItems } = useCart();

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Nos Créations", href: "/creations" },
    { name: "Coffrets", href: "/coffrets" },
    { name: "Sur Mesure", href: "/custom" },
    { name: "Contact", href: "/contact" },
  ];

  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
    },

    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },

    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <>
      <nav className="w-full bg-[#fdfaf5] sticky top-0 z-50 border-b border-[#e8d5b5]">
        
        {/* Barre d'annonce */}
        <div className="bg-[#8b5e34] text-[#fdfaf5] py-1 text-center text-[10px] uppercase tracking-[0.2em] font-light px-4">
          Livraison partout au Maroc — Savoir-faire ancestral
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Bouton menu mobile */}
            <button
              className="lg:hidden p-2 text-[#5d4037] hover:bg-[#8b5e34]/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 group select-none"
            >
              <div className="relative w-10 h-10 md:w-14 md:h-14 overflow-hidden rounded-full border-2 border-[#c29b40] shadow-md flex-shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/halawa.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-serif font-bold text-[#5d4037] leading-tight">
                  ALLO <span className="text-[#c29b40]">LHALAWA</span>
                </h1>

                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-[#8b5e34] font-medium">
                  Pâtisserie MAROCAINE
                </span>
              </div>
            </Link>

            {/* Menu desktop */}
            <ul className="hidden lg:flex items-center gap-8 text-[#5d4037] font-medium text-sm tracking-wide">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c29b40] hover:after:w-full after:transition-all after:duration-300 transition-colors hover:text-[#c29b40]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-6">

              {/* Panier */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative group p-2 text-[#5d4037] hover:bg-[#8b5e34]/5 rounded-full transition-all"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#c29b40] transition-colors" />

                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      className="absolute top-0 right-0 bg-[#c29b40] text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold border-2 border-[#fdfaf5]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Bouton commander */}
              <Link
                href="/creations"
                className="hidden sm:block bg-[#8b5e34] hover:bg-[#5d4037] text-white px-5 md:px-8 py-2 md:py-2.5 rounded-sm transition-all duration-300 text-[10px] md:text-sm uppercase tracking-widest font-bold active:scale-95 text-center"
              >
                Commander
              </Link>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden bg-[#fdfaf5] border-t border-[#e8d5b5]"
            >
              <ul className="flex flex-col p-6 gap-4 text-[#5d4037] text-lg font-serif">
                {navLinks.map((link) => (
                  <li
                    key={link.name}
                    className="border-b border-[#f3e6d3] pb-3"
                  >
                    <Link
                      href={link.href}
                      className="flex justify-between items-center transition-colors hover:text-[#c29b40]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}

                      <span className="text-[#c29b40] text-xl">
                        ›
                      </span>
                    </Link>
                  </li>
                ))}

                <Link
                  href="/creations"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#8b5e34] text-white py-4 rounded-sm mt-2 shadow-md uppercase tracking-[0.2em] text-xs font-bold transition-all hover:bg-[#5d4037] active:scale-95 text-center block"
                >
                  E-Boutique
                </Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}