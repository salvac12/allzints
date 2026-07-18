"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@allzints.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      // FormSubmit responde 200 con {"success":"true"|"false"} — no basta con res.ok
      const result = await res.json().catch(() => null);
      const success = String(result?.success) === "true";
      if (!res.ok || !success) throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="alert"
        className="bg-white rounded-card p-8 text-center shadow-sm"
      >
        <h3 className="font-heading text-2xl text-texto">¡Mensaje enviado!</h3>
        <p className="mt-3 text-mid">
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value="Nuevo mensaje desde allzints.com" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-texto mb-1.5">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full rounded-card border border-border bg-white px-4 py-3 text-texto focus:outline-none focus:ring-2 focus:ring-terracotta/50"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-texto mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-card border border-border bg-white px-4 py-3 text-texto focus:outline-none focus:ring-2 focus:ring-terracotta/50"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-texto mb-1.5">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className="w-full rounded-card border border-border bg-white px-4 py-3 text-texto focus:outline-none focus:ring-2 focus:ring-terracotta/50"
          placeholder="Cuéntanos en qué podemos ayudarte"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-terracotta hover:bg-terracotta-light disabled:opacity-60 text-white px-8 py-3 rounded-card font-medium transition-colors"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 text-center">
          No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a
          info@allzints.com.
        </p>
      )}
    </form>
  );
}
