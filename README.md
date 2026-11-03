# 🥖 Dulce Sin Gluten - Aplicación Móvil en React Native

Aplicación móvil desarrollada con **React Native** y **Expo** para una panadería artesanal especializada en productos **100% libres de gluten**, diseñada como propuesta comercial y técnica para incentivar las ventas mediante una experiencia visual atractiva y promociones dinámicas.

---

## 📱 Objetivo del Proyecto

La aplicación busca resolver la necesidad de personas celíacas o con sensibilidad al gluten de encontrar opciones de repostería y panadería seguras, combinando:
1. **Atracción Visual:** Catálogo con fotografías de alta calidad de los panes para despertar el interés del cliente.
2. **Transparencia e Información:** Al tocar cualquier producto, se despliega una ventana de detalle con los ingredientes exactos y la garantía de cero contaminación cruzada.
3. **Estrategia Comercial de Ventas:** Un carrito interactivo que ofrece un cupón promocional: *¡Llévate el segundo pan con 50% de descuento!*, incentivando al cliente a aumentar el volumen de su compra.

---

## ✨ Funcionalidades Principales

- **Catálogo de Panes Artesanales:**
  - Despliegue dinámico de productos con nombre, precio y fotografía apetitosa.
  - Indicador visual de producto libre de gluten.
- **Detalle de Producto (Modal Interactivo):**
  - Vista ampliada al hacer clic en cualquier pan.
  - Lista detallada de ingredientes (ej. harina de almendras, fécula de mandioca, masa madre sin gluten).
  - Sello de certificación para celíacos.
  - Botón directo para añadir al carrito.
- **Carrito de Compras y Lógica Comercial:**
  - Contador de piezas y resumen financiero (Subtotal, Descuentos y Total).
  - Activación automática de la promoción comercial al contar con 2 o más piezas.
  - Posibilidad de eliminar artículos individualmente.
  - Alerta de confirmación de pago y vaciado de carrito.

---

## 🛠️ Tecnologías y Conceptos de React Native Utilizados

- **React Native & Expo:** Framework para desarrollo móvil multiplataforma (Android, iOS y Web).
- **Hooks de React:**
  - `useState`: Manejo del estado local para el carrito de compras, el pan seleccionado para el detalle (`Modal`) y el estado del cupón de descuento.
- **Componentes Nativos:**
  - `<View>`: Estructura y contenedores de diseño.
  - `<Text>`: Títulos, precios y descripciones estilizadas.
  - `<Image>`: Carga y renderizado de imágenes de alta resolución.
  - `<TouchableOpacity>`: Botones interactivos con retroalimentación táctil.
  - `<ScrollView>`: Desplazamiento fluido vertical en dispositivos móviles.
  - `<Modal>`: Ventana emergente superpuesta para la visualización de ingredientes.
  - `<SafeAreaView>`: Adaptación visual segura a las pantallas con notch o barras de estado.
- **Estilos con StyleSheet:**
  - Paleta de colores cálidos (#582C12, #D97706, #FEF3C7) representativa de panadería artesanal.
  - Diseño responsivo adaptable a pantallas de celulares y navegador web.

---

## 🚀 Cómo Ejecutar la Aplicación

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/daro-dddd/panaderia-app.git
   cd panaderia-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar con Expo:**
   ```bash
   npx expo start
   ```

4. **Visualización:**
   - **En el navegador web:** Presiona la tecla `w`.
   - **En celular real:** Abre la aplicación **Expo Go** y escanea el código QR mostrado en la terminal.
