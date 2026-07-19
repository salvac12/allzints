const DESCRIPCIONES: Record<string, string> = {
  etnicas:
    "Elegante Zinta para el Móvil fabricada en España, con un toque elegante y cómodo para tus looks, se adapta a todas las carcasas móviles gracias al adaptador incluido con la compra de la Zinta.",
  tapiceria:
    "Elegante Zinta para el Móvil fabricada en España, con un toque elegante y cómodo para tus looks, se adapta a todas las carcasas móviles gracias al adaptador incluido con la compra de la Zinta.",
  "mini-etnicas":
    "Elegante Mini Zinta para el móvil o las llaves, fabricada en España, con un toque elegante y cómodo. Incluye mosquetón y adaptador para el móvil.",
  "mini-gobelino":
    "Elegante Mini Zinta para el móvil o las llaves, fabricada en España, con un toque elegante y cómodo. Incluye mosquetón y adaptador para el móvil.",
  llaveros:
    "Llavero artesanal tejido a mano en España, con anilla metálica resistente para tus llaves.",
};

const MEDIDAS: Record<string, string> = {
  etnicas: "Largo: 120 cm · Ancho: 3 cm",
  tapiceria: "Largo: 120 cm · Ancho: 3 cm",
  "mini-etnicas": "Largo: 20 cm · Ancho: 3 cm",
  "mini-gobelino": "Largo: 20 cm · Ancho: 3 cm",
  llaveros: "Largo: 17 cm",
  bolsos: "Alto: 20 cm · Ancho: 30 cm",
};

const MATERIALES: Record<string, string> = {
  etnicas: "Algodón, acrílico y poliamida",
  tapiceria: "Algodón y poliéster",
  "mini-etnicas": "Algodón, acrílico y poliamida",
  "mini-gobelino": "Algodón y poliéster",
  llaveros: "Poliéster",
  bolsos: "Tela de gobelino y forro de tela de toldo",
};

const CUIDADO =
  "Apta para lavado a máquina en programa suave. Recomendamos introducirla en una bolsa de lavado para evitar que se enganche con otras prendas.";

// Los bolsos no llevan ficha de cuidado (no se lavan).
const SIN_CUIDADO = new Set(["bolsos"]);

const MedidasIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 8.25h16.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 15V9a.75.75 0 0 1 .75-.75Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8.25v3M11 8.25v4.5M15 8.25v3M19 8.25v4.5"
    />
  </svg>
);

const MaterialesIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c1.8 1.2 2.7 2.9 2.7 4.8 0 1.2-.6 2.3-1.5 3 .9.2 1.8.1 2.7-.3-1 2.7-3 4.2-5.9 4.2S5.1 13.2 4.1 10.5c.9.4 1.8.5 2.7.3-.9-.7-1.5-1.8-1.5-3C5.3 5.9 6.2 4.2 8 3c.6 1.3 1.1 2.6 2 3.6.9-1 1.4-2.3 2-3.6Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v6m0 0-2-1.5M12 21l2-1.5"
    />
  </svg>
);

const CuidadoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.75c2.5 3 4.5 5.6 4.5 8.25a4.5 4.5 0 1 1-9 0c0-2.65 2-5.25 4.5-8.25Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 12.75c0 1.24 1.01 2.25 2.25 2.25"
    />
  </svg>
);

const buildSpecs = (categoria: string) => {
  const specs = [
    { label: "Medidas", value: MEDIDAS[categoria], icon: MedidasIcon },
    { label: "Materiales", value: MATERIALES[categoria], icon: MaterialesIcon },
  ];
  if (!SIN_CUIDADO.has(categoria)) {
    specs.push({ label: "Cuidado", value: CUIDADO, icon: CuidadoIcon });
  }
  return specs;
};

export default function ProductSpecs({
  categoria,
  descripcion,
}: {
  categoria: string;
  descripcion?: string;
}) {
  const topText = DESCRIPCIONES[categoria] ?? descripcion;
  const specs = buildSpecs(categoria);

  return (
    <div className="mt-6">
      {topText && <p className="text-mid leading-relaxed">{topText}</p>}

      <h3 className="text-sm font-medium text-texto uppercase tracking-wide mt-6">
        Materiales y medidas
      </h3>
      <div className="mt-3 space-y-3">
        {specs.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
              {s.icon}
            </span>
            <div>
              <p className="text-xs text-mid uppercase tracking-wide">
                {s.label}
              </p>
              <p className="text-sm text-texto font-medium">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
