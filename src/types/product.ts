// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Product {
  _id: string;
  nombre: string;
  slug: string;
  precio: number;
  categoria: "bolsos" | "etnicas" | "tapiceria";
  imagen: SanityImage;
  galeria?: SanityImage[];
  descripcion: string;
  materiales: string[];
  dimensiones?: string;
  stock: number;
  oldId?: string;
}

// Legacy product format (from JSON, used during migration)
export interface LegacyProduct {
  id: string;
  nombre: string;
  precio: number;
  categoria: "bolsos" | "etnicas" | "tapiceria";
  imagen: string;
  descripcion: string;
  materiales: string[];
  dimensiones?: string;
}

export interface CartItem {
  _id: string;
  oldId?: string;
  nombre: string;
  slug: string;
  precio: number;
  categoria: string;
  imagenUrl: string;
  quantity: number;
}
