import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "All Zints — Accesorios artesanales",
    template: "%s | All Zints",
  },
  description:
    "Accesorios artesanales hechos a mano con telas étnicas y de tapicería. Bolsos, cintas para móvil y más. Envío gratis en compras superiores a 50€.",
  keywords: [
    "accesorios artesanales",
    "bolsos hechos a mano",
    "cintas para móvil",
    "telas étnicas",
    "moda sostenible",
    "All Zints",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
