# Dulce Sin Gluten - Aplicacion Movil en React Native

Aplicacion movil desarrollada con **React Native** y **Expo** para una panaderia artesanal especializada en productos **100% libres de gluten**, disenada como propuesta comercial y tecnica para incentivar las ventas mediante una experiencia visual atractiva y promociones dinamicas.

---

## Objetivo del Proyecto

La aplicacion busca resolver la necesidad de personas celiacas o con sensibilidad al gluten de encontrar opciones de reposteria y panaderia seguras, combinando:
1. **Atraccion Visual:** Catalogo con fotografias de alta calidad de los panes para despertar el interes del cliente.
2. **Transparencia e Informacion:** Al tocar cualquier producto, se despliega una ventana de detalle con los ingredientes exactos y la garantia de cero contaminacion cruzada.
3. **Estrategia Comercial de Ventas:** Un aviso y carrito interactivo que ofrece la promocion: *Si agregas un Pan de Muerto te damos el 50% en el mismo*, incentivando al cliente a probar el producto de temporada.

---

## Funcionalidades Principales

- **Catalogo de Panes Artesanales:**
  - Despliegue dinamico de productos con nombre, precio y fotografia apetitosa.
  - Indicador visual de producto libre de gluten.
- **Detalle de Producto (Modal Interactivo):**
  - Vista ampliada al hacer clic en cualquier pan.
  - Lista detallada de ingredientes (ej. harina de almendras, fecula de mandioca, masa madre sin gluten).
  - Sello de certificacion para celiacos.
  - Boton directo para anadir al carrito.
- **Carrito de Compras y Logica Comercial:**
  - Contador de piezas y resumen financiero (Subtotal, Descuentos y Total).
  - Activacion automatica del 50% de descuento al incluir un Pan de Muerto en la orden.
  - Posibilidad de eliminar articulos individualmente.
  - Alerta de confirmacion de pago y vaciado de carrito.

---

## Tecnologias y Conceptos de React Native Utilizados

- **React Native & Expo:** Framework para desarrollo movil multiplataforma (Android, iOS y Web).
- **Hooks de React:**
  - `useState`: Manejo del estado local para el carrito de compras, el pan seleccionado para el detalle (`Modal`) y el estado del cupon de descuento.
- **Componentes Nativos:**
  - `<View>`: Estructura y contenedores de diseno.
  - `<Text>`: Titulos, precios y descripciones estilizadas.
  - `<Image>`: Carga y renderizado de imagenes de alta resolucion.
  - `<TouchableOpacity>`: Botones interactivos con retroalimentacion tactil.
  - `<ScrollView>`: Desplazamiento fluido vertical en dispositivos moviles.
  - `<Modal>`: Ventana emergente superpuesta para la visualizacion de ingredientes.
  - `<SafeAreaView>`: Adaptacion visual segura a las pantallas con notch o barras de estado.
- **Estilos con StyleSheet:**
  - Paleta de colores calidos (#582C12, #D97706, #FEF3C7) representativa de panaderia artesanal.
  - Diseno responsivo adaptable a pantallas de celulares y navegador web.

---

## Como Ejecutar la Aplicacion

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

4. **Visualizacion:**
   - **En el navegador web:** Presiona la tecla `w`.
   - **En celular real:** Abre la aplicacion **Expo Go** y escanea el codigo QR mostrado en la terminal.
