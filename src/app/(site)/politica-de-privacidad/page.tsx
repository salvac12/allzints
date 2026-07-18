import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos de All Zints.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>AllZints SL</p>

      <h2>Finalidad del tratamiento</h2>
      <p>
        Los datos personales recabados a través de los formularios del sitio web
        serán utilizados para:
      </p>
      <ol>
        <li>Gestionar pedidos y envíos.</li>
        <li>
          Responder consultas realizadas a través del formulario de contacto.
        </li>
        <li>Enviar comunicaciones comerciales (si el usuario lo consiente).</li>
      </ol>

      <h2>Base legal para el tratamiento</h2>
      <p>
        El tratamiento se realiza con base en el consentimiento del usuario y/o
        la necesidad contractual para gestionar pedidos.
      </p>

      <h2>Derechos del usuario</h2>
      <p>
        El usuario puede ejercer sus derechos de acceso, rectificación,
        supresión, oposición, limitación y portabilidad enviando un correo a{" "}
        <a href="mailto:info@allzints.com">info@allzints.com</a>. También puede
        presentar una reclamación ante la Agencia Española de Protección de
        Datos (AEPD).
      </p>

      <h2>Plazo de conservación</h2>
      <p>
        Los datos se conservarán mientras exista una relación contractual o
        hasta que el usuario solicite su eliminación.
      </p>

      <h2>Cesión de datos a terceros</h2>
      <p>
        Los datos podrán ser compartidos con empresas logísticas para realizar
        los envíos o con plataformas de pago seguras (p. ej., PayPal o Stripe)
        para procesar transacciones.
      </p>
    </LegalPage>
  );
}
