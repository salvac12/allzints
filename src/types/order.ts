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
