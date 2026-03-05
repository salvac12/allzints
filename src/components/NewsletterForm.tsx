"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Tu email"
        className="flex-1 px-4 py-3 rounded-card border border-border bg-cream focus:outline-none focus:border-terracotta transition-colors"
        required
      />
      <button
        type="submit"
        className="bg-terracotta hover:bg-terracotta-light text-white px-6 py-3 rounded-card font-medium transition-colors whitespace-nowrap"
      >
        Suscribirme
      </button>
    </form>
  );
}
