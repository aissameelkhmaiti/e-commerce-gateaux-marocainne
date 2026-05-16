"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number; // Ici, quantity = Kilogrammes (ex: 1.5)
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Charger le panier depuis LocalStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem("halawiyat_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erreur LocalStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Sauvegarder dans LocalStorage à chaque modification
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("halawiyat_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Ajouter au panier (Sécurité : une seule fois par produit)
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev; // Ne rien faire si déjà présent

      return [...prev, { ...product, quantity: 1 }]; // Ajoute 1kg par défaut
    });
  };

  // Modifier la quantité (Kg)
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id 
          ? { ...item, quantity: Math.max(0.5, quantity) } // Minimum 0.5kg
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calcul du prix total
  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Nombre de types de produits différents
  const totalItems = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
};