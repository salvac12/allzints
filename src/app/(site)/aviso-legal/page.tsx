import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal del sitio web www.allzints.com.",
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso Legal">
      <h2>Titular del sitio web</h2>
      <ul>
        <li>
          <strong>Titular:</strong> AllZints SL
        </li>
        <li>
          <strong>Dirección:</strong> Paseo de los Parques 6, portal 6, Bajo A.
          28109 Alcobendas (Madrid)
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href="mailto:info@allzints.com">info@allzints.com</a>
        </li>
      </ul>

      <h2>Objeto del sitio web</h2>
      <p>
        El presente sitio web tiene como finalidad la venta de productos como
        Zintas para móvil, bolsos, llaveros y otros accesorios.
      </p>

      <h2>Condiciones de uso</h2>
      <p>
        El acceso y uso del sitio web implica la aceptación de las condiciones
        descritas en este Aviso Legal. El titular se reserva el derecho a
        modificar el contenido en cualquier momento.
      </p>

      <h2>Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web (textos, imágenes, logotipos,
        diseños, etc.) son propiedad del titular o cuentan con las licencias
        necesarias. Queda prohibida su reproducción sin autorización expresa.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        El titular no se hace responsable de los daños o perjuicios derivados
        del uso incorrecto del sitio web ni de problemas técnicos ajenos a su
        control.
      </p>
    </LegalPage>
  );
}
