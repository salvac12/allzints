# All Zints — Ecommerce

Tienda online de All Zints, marca española de accesorios artesanales hechos a mano con telas étnicas y de tapicería.

## Stack

- **Next.js 14** con App Router y TypeScript
- **Tailwind CSS** para estilos
- **Zustand** para gestión del carrito
- **next/image** para optimización de imágenes
- Datos de productos desde JSON local (sin base de datos)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/allzints.git
cd allzints

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local

# Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Layout global (nav + footer + cart)
│   ├── page.tsx            # Página principal
│   ├── productos/
│   │   ├── page.tsx        # Catálogo con filtros
│   │   └── [id]/page.tsx   # Detalle de producto
│   └── nosotros/page.tsx   # Página sobre nosotros
├── components/             # Componentes reutilizables
├── data/productos.json     # Datos de productos
├── store/cartStore.ts      # Estado del carrito (Zustand)
└── types/product.ts        # Tipos TypeScript
```

## Deploy en Vercel

```bash
npm i -g vercel
vercel
```

O conecta el repositorio en [vercel.com](https://vercel.com) para deploy automático.
