import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies del sitio web www.allzints.com.",
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPage title="Política de Cookies">
      <p>
        En este sitio web utilizamos cookies para mejorar la experiencia del
        usuario y analizar el tráfico del sitio. Al acceder al sitio por primera
        vez, se solicitará tu consentimiento para el uso de cookies no
        esenciales.
      </p>

      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al
        visitar nuestro sitio web.
      </p>

      <h2>Tipos de cookies utilizadas</h2>
      <ol>
        <li>
          <strong>Cookies técnicas (necesarias):</strong> permiten el
          funcionamiento básico del sitio.
        </li>
        <li>
          <strong>Cookies analíticas:</strong> nos ayudan a entender cómo los
          usuarios interactúan con la web.
        </li>
        <li>
          <strong>Cookies publicitarias:</strong> utilizadas para mostrar
          anuncios personalizados (si aplica).
        </li>
      </ol>

      <h2>Cookies propias y de terceros</h2>
      <p>
        Algunas cookies son gestionadas directamente por nosotros (cookies
        propias), mientras que otras son gestionadas por terceros (cookies de
        terceros) para ofrecer funcionalidades adicionales o analizar el
        tráfico.
      </p>

      <h2>Gestión y desactivación de cookies</h2>
      <p>
        Puedes aceptar, rechazar o configurar las cookies a través del banner
        que aparece al acceder a nuestra web. Además, puedes gestionar tus
        preferencias desde la configuración de tu navegador.
      </p>

      <h2>Consentimiento</h2>
      <p>
        Al navegar en nuestro sitio web, tienes la opción de aceptar o rechazar
        las cookies. Las cookies no esenciales solo se instalarán si otorgas tu
        consentimiento.
      </p>
    </LegalPage>
  );
}
