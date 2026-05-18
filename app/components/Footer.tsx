"use client";

import Link from "next/link";
import {
  
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Nos Créations", href: "/creations" },
    { name: "Coffrets", href: "/coffrets" },
    { name: "Sur Mesure", href: "/custom" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#fdfaf5] border-t border-[#e8d5b5] ">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Logo & Description */}
          <div className="space-y-5">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c29b40] shadow-md">
                <img
                  src="/halawa.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-[#5d4037]">
                  ALLO <span className="text-[#c29b40]">LHALAWA</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b5e34] font-medium">
                  Pâtisserie Marocaine
                </p>
              </div>
            </Link>

            <p className="text-sm leading-7 text-[#7a5c4d]">
              Découvrez l’authenticité des pâtisseries marocaines
              préparées avec passion et savoir-faire traditionnel.
            </p>

            {/* Socials */}
           
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#5d4037] mb-5">
              Navigation
            </h3>

            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[#7a5c4d] hover:text-[#c29b40] transition-colors group"
                  >
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#5d4037] mb-5">
              Contact
            </h3>

            <div className="space-y-5 text-[#7a5c4d]">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-[#c29b40] mt-1"
                />
                <p className="text-sm leading-6">
                  Marrakech, Maroc
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-[#c29b40]"
                />
                <p className="text-sm">
                  +212 6 00 00 00 00
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-[#c29b40]"
                />
                <p className="text-sm">
                  contact@allolhalawa.ma
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e8d5b5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-center gap-4">
          
          <p className="text-xs tracking-wide text-[#8b5e34] text-center md:text-left">
            © {new Date().getFullYear()} ALLO LHALAWA — Tous droits réservés.
          </p>

      
        </div>
      </div>
    </footer>
  );
}