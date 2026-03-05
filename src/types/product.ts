export interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: "bolsos" | "etnicas" | "tapiceria";
  imagen: string;
  descripcion: string;
  materiales: string[];
  dimensiones?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
