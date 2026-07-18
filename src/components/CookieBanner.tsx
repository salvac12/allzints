"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "az-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-dark text-white/90 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm leading-relaxed flex-1">
          Utilizamos cookies técnicas necesarias para el funcionamiento de la
          web. Las cookies no esenciales solo se instalarán si las aceptas. Más
          información en nuestra{" "}
          <Link
            href="/politica-de-cookies"
            className="underline text-terracotta-light hover:text-white transition-colors"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => choose("rejected")}
            className="px-5 py-2 rounded-card border border-white/30 text-sm hover:border-white transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={() => choose("accepted")}
            className="px-5 py-2 rounded-card bg-terracotta hover:bg-terracotta-light text-white text-sm font-medium transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
