import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';

export default function App() {
  // ==========================================
  // 1. LISTA DE PRODUCTOS (CATÁLOGO DE PANES)
  // Cada pan tiene su foto, precio, e ingredientes sin gluten.
  // ==========================================
  const panes = [
    {
      id: 1,
      nombre: 'Pan Tradicional Sin Gluten',
      precio: 65,
      descripcionCorta: 'Esponjoso, suave y con un toque de ralladura de naranja natural.',
      imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      ingredientes: 'Harina de almendra, fécula de tapioca, ralladura de naranja fresca, flor de azahar y azúcar mascabado.',
      porQueSinGluten: 'Elaborado con harinas alternativas 100% libres de trigo, centeno y cebada. Apto para celíacos.',
    },
    {
      id: 2,
      nombre: 'Croissant Francés Sin Gluten',
      precio: 85,
      descripcionCorta: 'Hojaldre crujiente por fuera y tierno por dentro.',
      imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      ingredientes: 'Almidón de maíz certificado, harina de arroz fino, mantequilla pura de pastoreo y masa madre sin gluten.',
      porQueSinGluten: 'Técnica de laminado especial sin gluten para lograr hojaldre sin contaminación cruzada.',
    },
    {
      id: 3,
      nombre: 'Pan de Muerto Artesanal',
      precio: 75,
      descripcionCorta: 'El aroma tradicional de azahar y mantequilla que tanto te gusta.',
      imagen: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80',
      ingredientes: 'Harina de almendras seleccionadas, fécula de mandioca, huevo orgánico y esencia natural de azahar.',
      porQueSinGluten: 'Cero harinas con gluten. Horneado en hornos desinfectados y exclusivos.',
    },
    {
      id: 4,
      nombre: 'Muffin de Cacao Criollo',
      precio: 70,
      descripcionCorta: 'Intenso sabor a chocolate puro y chispas sin lácteos.',
      imagen: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
      ingredientes: 'Cacao puro mexicano al 70%, harina de avena certificada gluten-free, leche de almendras y monkfruit.',
      porQueSinGluten: 'Sin azúcar refinada y sin trigo. Una opción deliciosa y saludable.',
    },
    {
      id: 5,
      nombre: 'Baguette Rústica Crujiente',
      precio: 80,
      descripcionCorta: 'Corteza dorada y miga alveolada ideal para acompañar tus comidas.',
      imagen: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
      ingredientes: 'Harina de sorgo blanco, harina de arroz integral, semillas de chía, agua purificada y sal de mar.',
      porQueSinGluten: 'Fermentación natural de 24 horas que facilita la digestión sin usar gluten.',
    },
  ];

  // ==========================================
  // 2. ESTADOS DE LA APLICACIÓN (useState)
  // Aquí guardamos los datos que pueden cambiar.
  // ==========================================
  // Guarda los panes que el usuario ha metido al carrito
  const [carrito, setCarrito] = useState([]);

  // Guarda el pan que el usuario tocó para abrir la ventana con sus ingredientes
  const [panSeleccionado, setPanSeleccionado] = useState(null);

  // Guarda si el cupón del 50% de descuento en el segundo pan está activado
  const [cuponActivo, setCuponActivo] = useState(false);

  // ==========================================
  // 3. FUNCIONES (LÓGICA DE LA APLICACIÓN)
  // ==========================================
  
  // Función para mostrar alertas en celular o en navegador web sin errores
  const mostrarMensaje = (titulo, texto) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n${texto}`);
    } else {
      Alert.alert(titulo, texto);
    }
  };

  // Función para agregar un pan al carrito
  const agregarAlCarrito = (pan) => {
    setCarrito([...carrito, pan]);
    setPanSeleccionado(null); // Cerramos el detalle si estaba abierto
    mostrarMensaje('¡Agregado!', `Se añadió "${pan.nombre}" a tu pedido.`);
  };

  // Función para quitar un pan del carrito por su índice
  const quitarDelCarrito = (indiceABorrar) => {
    const nuevoCarrito = carrito.filter((_, index) => index !== indiceABorrar);
    setCarrito(nuevoCarrito);
    // Si quedan menos de 2 panes, se apaga el cupón del segundo pan
    if (nuevoCarrito.length < 2) {
      setCuponActivo(false);
    }
  };

  // Función para activar el cupón del 50% de descuento
  const activarCuponMitad = () => {
    if (carrito.length < 2) {
      mostrarMensaje(
        'Tip para aprovechar el cupón',
        '¡Agrega al menos 2 panes al carrito para que el segundo te cueste la mitad!'
      );
      return;
    }
    setCuponActivo(true);
    mostrarMensaje(
      '🎉 ¡Cupón Activado!',
      '¡Felicidades! Se aplicó 50% de descuento en tu segundo pan.'
    );
  };

  // ==========================================
  // 4. CÁLCULO DE TOTALES Y DESCUENTOS
  // ==========================================
  // Suma total sin descuentos
  const subtotal = carrito.reduce((acumulado, item) => acumulado + item.precio, 0);

  // Descuento: Si el cupón está activo y hay 2 o más panes, descontamos el 50% del segundo pan
  const descuento = cuponActivo && carrito.length >= 2 ? carrito[1].precio * 0.5 : 0;

  // Total final a pagar
  const total = Math.max(0, subtotal - descuento);

  // Función para finalizar y pagar la compra
  const finalizarCompra = () => {
    if (carrito.length === 0) {
      mostrarMensaje('Carrito vacío', 'Por favor selecciona al menos un pan antes de comprar.');
      return;
    }
    mostrarMensaje(
      '¡Compra Exitosa! 🥐',
      `Gracias por tu pedido en Dulce Sin Gluten.\nTotal cobrado: $${total} MXN.\n¡Tus panes van directo a tu mesa!`
    );
    // Vaciamos el carrito
    setCarrito([]);
    setCuponActivo(false);
  };

  // ==========================================
  // 5. DISEÑO VISUAL DE LA PANTALLA
  // ==========================================
  return (
    <SafeAreaView style={styles.contenedorSafeArea}>
      <View style={styles.contenedorCentral}>
        <ScrollView contentContainerStyle={styles.scroll}>

          {/* ENCABEZADO DE LA PANADERÍA */}
          <View style={styles.encabezado}>
            <Text style={styles.nombrePanaderia}>🥖 DULCE SIN GLUTEN</Text>
            <Text style={styles.subtituloPanaderia}>Panadería Artesanal 100% Celíaco-Friendly</Text>
            <View style={styles.badgeCertificado}>
              <Text style={styles.textoBadge}>✓ Cero Contaminación Cruzada</Text>
            </View>
          </View>

          {/* MENSAJE DE BIENVENIDA Y ESTRATEGIA COMERCIAL */}
          <View style={styles.bannerIncentivo}>
            <Text style={styles.bannerTitulo}>¿Por qué comprar con nosotros?</Text>
            <Text style={styles.bannerDescripcion}>
              Disfruta el sabor del pan tradicional sin inflamación ni gluten. 
              <Text style={{ fontWeight: 'bold', color: '#B45309' }}> ¡Toca cualquier foto para ver sus ingredientes!</Text>
            </Text>
          </View>

          {/* CATÁLOGO DE PRODUCTOS CON IMÁGENES ATRACTIVAS */}
          <Text style={styles.tituloSeccion}>Nuestros Panes Artesanales:</Text>

          {panes.map((pan) => (
            <View key={pan.id} style={styles.tarjetaProducto}>
              {/* Al hacer clic en la foto o tarjeta, se abre la ventana de detalle */}
              <TouchableOpacity
                style={styles.contenedorFotoYTexto}
                onPress={() => setPanSeleccionado(pan)}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: pan.imagen }}
                  style={styles.fotoPan}
                  resizeMode="cover"
                />
                <View style={styles.datosPan}>
                  <Text style={styles.nombrePan}>{pan.nombre}</Text>
                  <Text style={styles.descripcionPan}>{pan.descripcionCorta}</Text>
                  <Text style={styles.enlaceVerIngredientes}>🔍 Toca para ver de qué está hecho</Text>
                  <Text style={styles.precioPan}>${pan.precio} MXN</Text>
                </View>
              </TouchableOpacity>

              {/* Botón rápido para agregar directamente */}
              <TouchableOpacity
                style={styles.botonAgregarRapido}
                onPress={() => agregarAlCarrito(pan)}
              >
                <Text style={styles.textoBotonAgregar}>+ Agregar</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* ========================================== */}
          {/* SECCIÓN DEL CARRITO DE COMPRAS */}
          {/* ========================================== */}
          <Text style={styles.tituloSeccion}>
            🛒 Mi Carrito ({carrito.length} {carrito.length === 1 ? 'pan' : 'panes'}):
          </Text>

          <View style={styles.cajaCarrito}>
            {carrito.length === 0 ? (
              <View style={styles.carritoVacioBox}>
                <Text style={styles.carritoVacioTexto}>Aún no has agregado ningún pan.</Text>
                <Text style={styles.carritoVacioSubtexto}>Elige tus favoritos arriba para comenzar tu orden.</Text>
              </View>
            ) : (
              <>
                {/* Lista de panes agregados */}
                {carrito.map((item, index) => (
                  <View key={index} style={styles.filaItemCarrito}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemNombre}>{item.nombre}</Text>
                      <Text style={styles.itemPrecio}>${item.precio} MXN</Text>
                    </View>
                    <TouchableOpacity onPress={() => quitarDelCarrito(index)}>
                      <Text style={styles.botonQuitar}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* ==================================================== */}
                {/* CUPÓN DE DESCUENTO: ESTRATEGIA PARA SUBIR VENTAS     */}
                {/* Si llevas 2 panes, ¡el segundo a mitad de precio!   */}
                {/* ==================================================== */}
                <View style={styles.cajaCuponPromo}>
                  <Text style={styles.cuponTitulo}>🎁 ESTRATEGIA PARA VENDER MÁS:</Text>
                  <Text style={styles.cuponTexto}>
                    ¡Lleva tu segundo pan con <Text style={{ fontWeight: 'bold' }}>50% DE DESCUENTO</Text>!
                  </Text>

                  {carrito.length === 1 && (
                    <Text style={styles.cuponAvisoExtra}>
                      💡 Agrega 1 pan más al carrito para activar tu 50% de descuento.
                    </Text>
                  )}

                  {carrito.length >= 2 && !cuponActivo && (
                    <TouchableOpacity
                      style={styles.botonActivarCupon}
                      onPress={activarCuponMitad}
                    >
                      <Text style={styles.textoBotonActivarCupon}>
                        🏷️ APLICAR 50% EN EL SEGUNDO PAN
                      </Text>
                    </TouchableOpacity>
                  )}

                  {cuponActivo && (
                    <View style={styles.cuponAplicadoTag}>
                      <Text style={styles.textoCuponAplicado}>
                        ✓ ¡Cupón aplicado! 50% de rebaja en: {carrito[1]?.nombre} (-${descuento} MXN)
                      </Text>
                    </View>
                  )}
                </View>

                {/* RESUMEN DE LA CUENTA */}
                <View style={styles.resumenCuenta}>
                  <View style={styles.filaResumen}>
                    <Text style={styles.textoResumen}>Subtotal:</Text>
                    <Text style={styles.textoResumen}>${subtotal} MXN</Text>
                  </View>

                  {descuento > 0 && (
                    <View style={styles.filaResumen}>
                      <Text style={styles.textoDescuento}>Descuento 50% (2do Pan):</Text>
                      <Text style={styles.textoDescuento}>-${descuento} MXN</Text>
                    </View>
                  )}

                  <View style={styles.filaTotal}>
                    <Text style={styles.totalTexto}>TOTAL A PAGAR:</Text>
                    <Text style={styles.totalNumero}>${total} MXN</Text>
                  </View>
                </View>

                {/* BOTÓN PARA FINALIZAR COMPRA */}
                <TouchableOpacity style={styles.botonPagar} onPress={finalizarCompra}>
                  <Text style={styles.textoBotonPagar}>✓ Finalizar Compra (${total} MXN)</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

        </ScrollView>
      </View>

      {/* ========================================================= */}
      {/* VENTANA MODAL (PANTALLA DE DETALLE E INGREDIENTES)        */}
      {/* Aparece cuando le das clic a la foto o tarjeta de un pan */}
      {/* ========================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={panSeleccionado !== null}
        onRequestClose={() => setPanSeleccionado(null)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.tarjetaModal}>
            {panSeleccionado && (
              <ScrollView>
                {/* Imagen grande del producto */}
                <Image
                  source={{ uri: panSeleccionado.imagen }}
                  style={styles.modalFoto}
                  resizeMode="cover"
                />

                <View style={styles.modalContenido}>
                  {/* Sello de Sin Gluten */}
                  <View style={styles.modalBadgeGluten}>
                    <Text style={styles.modalBadgeGlutenTexto}>🌾 100% LIBRE DE GLUTEN</Text>
                  </View>

                  <Text style={styles.modalNombre}>{panSeleccionado.nombre}</Text>
                  <Text style={styles.modalPrecio}>${panSeleccionado.precio} MXN</Text>

                  {/* Sección: De qué está hecho */}
                  <View style={styles.seccionDetalle}>
                    <Text style={styles.modalSubtitulo}>🥣 ¿De qué está hecho?</Text>
                    <Text style={styles.modalTexto}>{panSeleccionado.ingredientes}</Text>
                  </View>

                  {/* Sección: Por qué es sin gluten y seguro */}
                  <View style={styles.seccionDetalle}>
                    <Text style={styles.modalSubtitulo}>🛡️ Garantía Sin Gluten:</Text>
                    <Text style={styles.modalTexto}>{panSeleccionado.porQueSinGluten}</Text>
                  </View>

                  {/* Botón para agregar desde la ventana de detalles */}
                  <TouchableOpacity
                    style={styles.botonModalAgregar}
                    onPress={() => agregarAlCarrito(panSeleccionado)}
                  >
                    <Text style={styles.textoBotonModalAgregar}>
                      + Agregar a mi Carrito (${panSeleccionado.precio} MXN)
                    </Text>
                  </TouchableOpacity>

                  {/* Botón para cerrar */}
                  <TouchableOpacity
                    style={styles.botonModalCerrar}
                    onPress={() => setPanSeleccionado(null)}
                  >
                    <Text style={styles.textoBotonModalCerrar}>Cerrar Detalle</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ==========================================
// 6. ESTILOS VISUALES (StyleSheet)
// Colores cálidos, claros y elegantes de panadería
// ==========================================
const styles = StyleSheet.create({
  contenedorSafeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  contenedorCentral: {
    width: '100%',
    maxWidth: 500,
    flex: 1,
    backgroundColor: '#FCFAF7',
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  encabezado: {
    backgroundColor: '#582C12',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  nombrePanaderia: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FEF3C7',
    letterSpacing: 0.5,
  },
  subtituloPanaderia: {
    fontSize: 13,
    color: '#FDE68A',
    marginTop: 4,
  },
  badgeCertificado: {
    backgroundColor: '#047857',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },
  textoBadge: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bannerIncentivo: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  bannerTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 2,
  },
  bannerDescripcion: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 17,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#451A03',
    marginVertical: 10,
  },
  tarjetaProducto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    padding: 12,
  },
  contenedorFotoYTexto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fotoPan: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  datosPan: {
    flex: 1,
    marginLeft: 12,
  },
  nombrePan: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  descripcionPan: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 15,
  },
  enlaceVerIngredientes: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: 'bold',
    marginTop: 4,
  },
  precioPan: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B45309',
    marginTop: 4,
  },
  botonAgregarRapido: {
    backgroundColor: '#D97706',
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonAgregar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cajaCarrito: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  carritoVacioBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  carritoVacioTexto: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  carritoVacioSubtexto: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  filaItemCarrito: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemNombre: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  itemPrecio: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: 'bold',
  },
  botonQuitar: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 4,
  },
  cajaCuponPromo: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  cuponTitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#B45309',
  },
  cuponTexto: {
    fontSize: 13,
    color: '#78350F',
    marginTop: 2,
  },
  cuponAvisoExtra: {
    fontSize: 11,
    color: '#92400E',
    marginTop: 6,
    fontStyle: 'italic',
  },
  botonActivarCupon: {
    backgroundColor: '#B45309',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotonActivarCupon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cuponAplicadoTag: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    marginTop: 8,
  },
  textoCuponAplicado: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: 'bold',
  },
  resumenCuenta: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  filaResumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  textoResumen: {
    fontSize: 13,
    color: '#4B5563',
  },
  textoDescuento: {
    fontSize: 13,
    color: '#059669',
    fontWeight: 'bold',
  },
  filaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalNumero: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B45309',
  },
  botonPagar: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
  },
  textoBotonPagar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // ESTILOS DEL MODAL (VENTANA DE DETALLE)
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  tarjetaModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalFoto: {
    width: '100%',
    height: 180,
  },
  modalContenido: {
    padding: 18,
  },
  modalBadgeGluten: {
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  modalBadgeGlutenTexto: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: 'bold',
  },
  modalNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B45309',
    marginTop: 2,
    marginBottom: 10,
  },
  seccionDetalle: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  modalSubtitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  modalTexto: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  botonModalAgregar: {
    backgroundColor: '#D97706',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  textoBotonModalAgregar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botonModalCerrar: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  textoBotonModalCerrar: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
});
