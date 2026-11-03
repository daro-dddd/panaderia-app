import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function ProductDetailModal({ visible, product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedCobertura, setSelectedCobertura] = useState(
    product.opcionesCobertura?.[0]?.id || null
  );
  const [selectedRelleno, setSelectedRelleno] = useState(
    product.opcionesRelleno?.[0]?.id || null
  );
  const [cantidad, setCantidad] = useState(1);
  const [activeTab, setActiveTab] = useState('personalizar'); // 'personalizar' | 'ingredientes'

  useEffect(() => {
    if (product) {
      setSelectedCobertura(product.opcionesCobertura?.[0]?.id || null);
      setSelectedRelleno(product.opcionesRelleno?.[0]?.id || null);
      setCantidad(1);
      setActiveTab('personalizar');
    }
  }, [product]);

  const coberturaItem = product.opcionesCobertura?.find((c) => c.id === selectedCobertura);
  const rellenoItem = product.opcionesRelleno?.find((r) => r.id === selectedRelleno);

  const coberturaExtra = coberturaItem?.extra || 0;
  const rellenoExtra = rellenoItem?.extra || 0;
  const precioUnitario = product.precio + coberturaExtra + rellenoExtra;
  const precioTotal = precioUnitario * cantidad;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      cartItemId: `${product.id}-${selectedCobertura}-${selectedRelleno}-${Date.now()}`,
      coberturaElegida: coberturaItem?.nombre || 'Estándar',
      rellenoElegido: rellenoItem?.nombre || 'Clásico',
      precioUnitario,
      cantidad,
      precioTotal,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          {/* Header del Modal */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {product.nombre}
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {/* Imagen Grande */}
            <View style={styles.imageBox}>
              <Image source={product.imagen} style={styles.image} resizeMode="cover" />
              <View style={styles.certifiedTag}>
                <Text style={styles.certifiedTagText}>✓ 100% CERO GLUTEN</Text>
              </View>
            </View>

            <View style={styles.content}>
              {/* Título y Precio */}
              <View style={styles.titlePriceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{product.nombre}</Text>
                  <Text style={styles.ratingInfo}>
                    ★ {product.calificacion} ({product.resenas} reseñas verificadas)
                  </Text>
                </View>
                <View style={styles.priceColumn}>
                  <Text style={styles.unitPrice}>${precioUnitario} MXN</Text>
                  <Text style={styles.unitLabel}>c/u</Text>
                </View>
              </View>

              <Text style={styles.longDescription}>{product.descripcionLarga}</Text>

              {/* Pestañas: Personalizar vs Ingredientes */}
              <View style={styles.tabBar}>
                <TouchableOpacity
                  style={[styles.tabButton, activeTab === 'personalizar' && styles.tabButtonActive]}
                  onPress={() => setActiveTab('personalizar')}
                >
                  <Text
                    style={[styles.tabText, activeTab === 'personalizar' && styles.tabTextActive]}
                  >
                    Personalizar Opciones
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tabButton, activeTab === 'ingredientes' && styles.tabButtonActive]}
                  onPress={() => setActiveTab('ingredientes')}
                >
                  <Text
                    style={[styles.tabText, activeTab === 'ingredientes' && styles.tabTextActive]}
                  >
                    Ingredientes & Salud
                  </Text>
                </TouchableOpacity>
              </View>

              {activeTab === 'personalizar' ? (
                <View>
                  {/* Selector de Cobertura */}
                  {product.opcionesCobertura?.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>1. Elige tu Cobertura:</Text>
                      {product.opcionesCobertura.map((opt) => {
                        const isSelected = selectedCobertura === opt.id;
                        return (
                          <TouchableOpacity
                            key={opt.id}
                            style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                            onPress={() => setSelectedCobertura(opt.id)}
                            activeOpacity={0.8}
                          >
                            <View style={styles.radioRow}>
                              <View style={[styles.radio, isSelected && styles.radioActive]} />
                              <Text
                                style={[styles.optionLabel, isSelected && styles.optionLabelActive]}
                              >
                                {opt.nombre}
                              </Text>
                            </View>
                            {opt.extra > 0 && (
                              <Text style={styles.optionExtra}>+${opt.extra} MXN</Text>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}

                  {/* Selector de Relleno */}
                  {product.opcionesRelleno?.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>2. Elige el Relleno:</Text>
                      {product.opcionesRelleno.map((opt) => {
                        const isSelected = selectedRelleno === opt.id;
                        return (
                          <TouchableOpacity
                            key={opt.id}
                            style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                            onPress={() => setSelectedRelleno(opt.id)}
                            activeOpacity={0.8}
                          >
                            <View style={styles.radioRow}>
                              <View style={[styles.radio, isSelected && styles.radioActive]} />
                              <Text
                                style={[styles.optionLabel, isSelected && styles.optionLabelActive]}
                              >
                                {opt.nombre}
                              </Text>
                            </View>
                            {opt.extra > 0 && (
                              <Text style={styles.optionExtra}>+${opt.extra} MXN</Text>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.nutritionBox}>
                  <Text style={styles.sectionTitle}>Garantía de Ingredientes Limpios:</Text>
                  {product.ingredientes.map((ing, idx) => (
                    <View key={idx} style={styles.ingredientRow}>
                      <Text style={styles.bullet}>🌾</Text>
                      <Text style={styles.ingredientText}>{ing}</Text>
                    </View>
                  ))}

                  {/* Tabla Nutricional */}
                  <View style={styles.nutritionTable}>
                    <Text style={styles.nutritionHeader}>
                      Valores por {product.infoNutricional.porción}:
                    </Text>
                    <View style={styles.nutrientRow}>
                      <Text style={styles.nutrientLabel}>Calorías:</Text>
                      <Text style={styles.nutrientValue}>{product.infoNutricional.calorias}</Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text style={styles.nutrientLabel}>Proteína:</Text>
                      <Text style={styles.nutrientValue}>{product.infoNutricional.proteina}</Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text style={styles.nutrientLabel}>Carbohidratos:</Text>
                      <Text style={styles.nutrientValue}>
                        {product.infoNutricional.carbohidratos}
                      </Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text style={styles.nutrientLabel}>Grasas Saludables:</Text>
                      <Text style={styles.nutrientValue}>
                        {product.infoNutricional.grasasSaludables}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Footer Fijo con Selector de Cantidad y Botón de Añadir */}
          <View style={styles.footer}>
            <View style={styles.counterRow}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setCantidad((prev) => Math.max(1, prev - 1))}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{cantidad}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setCantidad((prev) => prev + 1)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAdd} activeOpacity={0.85}>
              <Text style={styles.addToCartText}>
                Añadir al Carrito • ${precioTotal} MXN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    maxWidth: '70%',
  },
  scrollArea: {
    flexGrow: 0,
  },
  imageBox: {
    height: 200,
    width: '100%',
    position: 'relative',
    backgroundColor: '#FEF3C7',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  certifiedTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  certifiedTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#451A03',
    lineHeight: 24,
  },
  ratingInfo: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
    marginTop: 2,
  },
  priceColumn: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  unitPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#B45309',
  },
  unitLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  longDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
    marginVertical: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 4,
    marginVertical: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#78350F',
    fontWeight: '800',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  optionRowSelected: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9CA3AF',
  },
  radioActive: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  optionLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    flex: 1,
  },
  optionLabelActive: {
    color: '#92400E',
    fontWeight: '700',
  },
  optionExtra: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  nutritionBox: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 12,
  },
  ingredientText: {
    fontSize: 12,
    color: '#78350F',
    flex: 1,
    lineHeight: 16,
  },
  nutritionTable: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  nutritionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 6,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  nutrientLabel: {
    fontSize: 11,
    color: '#78350F',
  },
  nutrientValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#451A03',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 2,
  },
  counterButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  counterValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    paddingHorizontal: 8,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#D97706',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
