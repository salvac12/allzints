"use client";

import { useCartHydration } from "@/store/cartStore";

export default function CartHydration() {
  useCartHydration();
  return null;
}
