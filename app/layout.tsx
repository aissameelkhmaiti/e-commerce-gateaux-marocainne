// app/layout.tsx

import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

import "./globals.css";

import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

// Police Serif pour les titres
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

// Police Sans-Serif
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Halawiyat Fassi | Pâtisserie Fine Marocaine",
  description:
    "Découvrez l'art des gâteaux marocains traditionnels faits main avec amour et ingrédients naturels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fdfaf5] text-[#5d4037]">
     
        <CartProvider>
          
          <Navbar />
          
          
          <main className="flex-1">{children}</main>
              <Footer />
        </CartProvider>
      </body>
    </html>
  );
}