export interface ShippingInfo {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  provincia: string;
  notas?: string;
}

export type ShippingMethod = "ordinario" | "rapido";

// Clave "rapido" conservada por compatibilidad; se muestra como "certificado".
export const SHIPPING_OPTIONS: Record<
  ShippingMethod,
  { label: string; descripcion: string }
> = {
  ordinario: {
    label: "Envío ordinario",
    descripcion: "5-7 días laborables",
  },
  rapido: {
    label: "Envío certificado",
    descripcion: "48-72 h",
  },
};

// ── Cálculo de envío por peso (tarifas Correos península) ──────────────
// El peso se estima por unidades: 1 cinta = 1 unidad (~70 g),
// 1 bolso = 2 unidades. El paquete se factura por tramo de peso.
export const FREE_SHIPPING_THRESHOLD = 50; // € — envío ordinario gratis desde aquí
const UNIT_WEIGHT_G = 70;

// Tramos Correos por peso (gramos) → coste € { ordinario, certificado }
const WEIGHT_TIERS = [
  { maxG: 100, ordinario: 1.75, rapido: 6.53 },
  { maxG: 500, ordinario: 3.7, rapido: 8.48 },
  { maxG: Infinity, ordinario: 6.9, rapido: 11.68 },
];

export function shippingUnits(
  items: { categoria: string; quantity: number }[]
): number {
  return items.reduce(
    (u, i) => u + (i.categoria === "bolsos" ? 2 : 1) * i.quantity,
    0
  );
}

export function shippingCost(
  method: ShippingMethod,
  items: { categoria: string; quantity: number }[],
  subtotal: number
): number {
  const units = shippingUnits(items);
  if (units === 0) return 0;
  // Envío ordinario gratis a partir del umbral
  if (method === "ordinario" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  const grams = units * UNIT_WEIGHT_G;
  const tier =
    WEIGHT_TIERS.find((t) => grams <= t.maxG) ??
    WEIGHT_TIERS[WEIGHT_TIERS.length - 1];
  return tier[method];
}

export interface OrderItem {
  _id: string;
  oldId?: string;
  nombre: string;
  precio: number;
  quantity: number;
  imagenUrl: string;
  categoria?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shipping: ShippingInfo;
  total: number;
  status: "pending" | "paid" | "shipped" | "failed";
  checkoutId?: string;
  createdAt: string;
}
