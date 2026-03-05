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

export interface OrderItem {
  id: string;
  nombre: string;
  precio: number;
  quantity: number;
  imagen: string;
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
