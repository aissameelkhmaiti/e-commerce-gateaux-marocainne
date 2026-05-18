"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User, Phone } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion ou d'inscription ici
  };

  return (
    <section className="min-h-[85vh] bg-[#fdfaf5] flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl border border-[#e8d5b5] shadow-sm space-y-8">
        
        {/* En-tête du formulaire */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-[#5d4037]">
            {isRegister ? "Créer un compte" : "Se connecter"}
          </h1>
          <p className="text-xs text-gray-500 font-light">
            {isRegister 
              ? "Rejoignez Allo Lhalawa pour suivre vos commandes de délices" 
              : "Ravi de vous revoir ! Connectez-vous à votre espace gastronomique"}
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    required 
                    className="w-full pl-10 pr-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" 
                    placeholder="Amine Benjelloun" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input 
                    type="tel" 
                    required 
                    className="w-full pl-10 pr-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" 
                    placeholder="+212 600-000000" 
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Adresse e-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <input 
                type="email" 
                required 
                className="w-full pl-10 pr-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" 
                placeholder="votre@email.com" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Mot de passe</label>
              {!isRegister && (
                <a href="#" className="text-[10px] text-[#c29b40] hover:underline font-light">
                  Mot de passe oublié ?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <input 
                type="password" 
                required 
                className="w-full pl-10 pr-4 py-3 bg-[#fdfaf5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c29b40] transition-colors" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className="w-full bg-[#8b5e34] hover:bg-[#5d4037] text-white py-3.5 rounded-lg flex items-center justify-center gap-3 transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-sm pt-4"
          >
            {isRegister ? "S'inscrire" : "Connexion"} <ArrowRight size={14} />
          </button>
        </form>

        {/* Séparateur / Changement de mode */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-light">
            {isRegister ? "Vous avez déjà un compte ?" : "Nouveau chez Allo Lhalawa ?"}
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="text-[#c29b40] font-medium ml-1 hover:underline focus:outline-none"
            >
              {isRegister ? "Se connecter" : "Créer un compte"}
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}