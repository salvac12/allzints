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

export const SHIPPING_OPTIONS: Record<
  ShippingMethod,
  { label: string; descripcion: string; coste: number }
> = {
  ordinario: {
    label: "Envío ordinario",
    descripcion: "5-7 días laborables",
    coste: 3,
  },
  rapido: {
    label: "Envío rápido",
    descripcion: "48-72 h",
    coste: 5,
  },
};

export interface OrderItem {
  _id: string;
  oldId?: string;
  nombre: string;
  precio: number;
  quantity: number;
  imagenUrl: string;
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
