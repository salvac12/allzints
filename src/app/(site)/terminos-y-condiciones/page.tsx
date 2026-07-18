import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de compra de www.allzints.com.",
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos y Condiciones">
      <p>
        Bienvenidos a ALL ZINTS. Al acceder y utilizar nuestra página web
        www.allzints.com, aceptas los siguientes Términos y Condiciones. Te
        recomendamos leerlos detenidamente antes de realizar cualquier compra o
        utilizar nuestros servicios.
      </p>

      <h2>1. Información general</h2>
      <ul>
        <li>
          <strong>Titular de la web:</strong> ALL ZINTS
        </li>
        <li>
          <strong>Domicilio social:</strong> Paseo de los Parques 6, portal 6,
          Bajo A. 28109 Alcobendas (Madrid)
        </li>
        <li>
          <strong>NIF:</strong> 05421713S
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong>{" "}
          <a href="mailto:info@allzints.com">info@allzints.com</a>
        </li>
        <li>
          <strong>Teléfono de contacto:</strong> 629 602 809 / 649 738 682
        </li>
      </ul>
      <p>
        Nuestra tienda online está destinada exclusivamente a clientes
        residentes en España. No realizamos envíos fuera del territorio español.
      </p>

      <h2>2. Objeto</h2>
      <p>
        Estos Términos y Condiciones regulan el acceso, navegación y uso del
        sitio web, así como la relación contractual entre ALL ZINTS y los
        usuarios que realicen compras a través del mismo.
      </p>

      <h2>3. Productos</h2>
      <p>
        En nuestra tienda ofrecemos accesorios, cintas para móviles, llaveros y
        bolsos. Nos esforzamos por mostrar las características, colores y
        detalles de los productos con la mayor precisión posible. Sin embargo,
        no podemos garantizar que los colores mostrados en pantalla coincidan
        exactamente con los reales debido a las configuraciones del dispositivo
        del usuario.
      </p>
      <p>
        Todos los productos están sujetos a disponibilidad. En caso de que un
        producto no esté disponible tras realizar un pedido, nos pondremos en
        contacto contigo para ofrecerte una solución (reembolso, cambio por otro
        producto, etc.).
      </p>

      <h2>4. Precios e impuestos</h2>
      <p>
        Los precios mostrados en la web están expresados en euros (€) e incluyen
        el IVA correspondiente. Los gastos de envío no están incluidos en el
        precio del producto y se detallarán antes de finalizar la compra. Nos
        reservamos el derecho de modificar los precios en cualquier momento. Sin
        embargo, los cambios no afectarán a pedidos ya confirmados.
      </p>

      <h2>5. Proceso de compra</h2>
      <ol>
        <li>Selecciona los productos que deseas comprar y añádelos al carrito.</li>
        <li>Revisa tu carrito y haz clic en &quot;Finalizar compra&quot;.</li>
        <li>
          Introduce tus datos personales, dirección de envío y método de pago.
        </li>
        <li>Confirma tu pedido y realiza el pago.</li>
        <li>
          Recibirás un correo electrónico confirmando tu pedido con todos los
          detalles.
        </li>
      </ol>

      <h2>6. Métodos de pago</h2>
      <p>Aceptamos los siguientes métodos de pago:</p>
      <ul>
        <li>Tarjeta de crédito/débito (Visa, Mastercard, etc.)</li>
        <li>PayPal</li>
        <li>Transferencia bancaria</li>
      </ul>
      <p>El pago debe ser completado antes del envío del pedido.</p>

      <h2>7. Envíos</h2>
      <p>
        Realizamos envíos únicamente dentro del territorio español (incluyendo
        Islas Baleares, Islas Canarias, Ceuta y Melilla).
      </p>
      <h3>Plazos de entrega</h3>
      <ul>
        <li>Península: 3 días laborables</li>
        <li>Baleares: 3-5 días laborables</li>
        <li>Canarias, Ceuta y Melilla: 5-7 días laborables</li>
      </ul>
      <h3>Costes de envío</h3>
      <p>
        Los gastos de envío se calculan en función del destino y se mostrarán
        antes de confirmar el pedido.
      </p>

      <h2>8. Política de devoluciones y cambios</h2>
      <h3>Derecho de desistimiento</h3>
      <p>
        Tienes derecho a desistir del contrato en un plazo de 14 días naturales
        desde la recepción del pedido sin necesidad de justificación.
      </p>
      <p>Para ejercer este derecho:</p>
      <ol>
        <li>
          Escríbenos a{" "}
          <a href="mailto:info@allzints.com">info@allzints.com</a> indicando tu
          intención.
        </li>
        <li>
          Devuelve el producto en su estado original (sin usar y con su embalaje
          original).
        </li>
      </ol>
      <p>
        Los gastos asociados al envío para devoluciones corren por cuenta del
        cliente, salvo que el producto sea defectuoso o incorrecto.
      </p>
      <h3>Productos defectuosos o incorrectos</h3>
      <p>
        Si recibes un producto defectuoso o incorrecto, contáctanos dentro de
        las primeras 48 horas tras la recepción para gestionar una solución sin
        coste adicional.
      </p>

      <h2>9. Garantía</h2>
      <p>
        Todos nuestros productos cuentan con una garantía legal conforme a lo
        establecido por la normativa española (Ley General para la Defensa de
        los Consumidores y Usuarios). Si detectas algún defecto en el producto
        durante el período legal aplicable (2 años desde la recepción),
        contáctanos para solucionarlo.
      </p>

      <h2>10. Protección de datos</h2>
      <p>
        Cumplimos con la normativa vigente en materia de protección de datos
        personales (Reglamento General de Protección de Datos - RGPD). Para más
        información sobre cómo tratamos tus datos personales, consulta nuestra{" "}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>

      <h2>11. Propiedad intelectual</h2>
      <p>
        Todos los contenidos presentes en nuestra página web (textos, imágenes,
        logotipos, diseños, etc.) son propiedad exclusiva de ALL ZINTS o tienen
        licencia para su uso. Está prohibida su reproducción total o parcial sin
        nuestro consentimiento previo por escrito.
      </p>

      <h2>12. Modificaciones</h2>
      <p>
        Nos reservamos el derecho a modificar estos Términos y Condiciones en
        cualquier momento. Las modificaciones entrarán en vigor desde su
        publicación en nuestra página web.
      </p>

      <h2>13. Legislación aplicable y jurisdicción</h2>
      <p>
        Estos Términos y Condiciones se rigen por la legislación española
        vigente. En caso de disputa, ambas partes acuerdan someterse a los
        juzgados y tribunales correspondientes al domicilio del consumidor.
      </p>
    </LegalPage>
  );
}
