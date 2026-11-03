import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { COUPONS, DELIVERY_DATES, SUCURSALES } from '../data/promotions';

const FREE_SHIPPING_THRESHOLD = 300;
const STANDARD_SHIPPING_FEE = 45;

export default function CartModal({
  visible,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  deliveryType,
  appliedCoupon,
  onApplyCoupon,
  onCheckoutSuccess,
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedDate, setSelectedDate] = useState('hoy');
  const [selectedSucursal, setSelectedSucursal] = useState('suc-1');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Cálculos de subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.precioTotal, 0);

  // Cálculo de envío
  let costoEnvio = 0;
  if (deliveryType === 'delivery') {
    if (subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.descuentoEnvio) {
      costoEnvio = 0;
    } else {
      costoEnvio = STANDARD_SHIPPING_FEE;
    }
  }

  // Cálculo de descuento
  let descuento = 0;
  if (appliedCoupon) {
    if (appliedCoupon.descuentoPorcentaje) {
      descuento = Math.round((subtotal * appliedCoupon.descuentoPorcentaje) / 100);
    } else if (appliedCoupon.descuentoFijo) {
      descuento = Math.min(subtotal, appliedCoupon.descuentoFijo);
    }
  }

  const total = Math.max(0, subtotal - descuento + costoEnvio);
  const faltaParaEnvioGratis = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const porcentajeEnvioGratis = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const promo = COUPONS[code];
    if (!promo) {
      setCouponError('Código inválido o vencido');
      return;
    }

    if (promo.minimoCompra && subtotal < promo.minimoCompra) {
      setCouponError(`Requiere compra mínima de $${promo.minimoCompra} MXN`);
      return;
    }

    onApplyCoupon(promo);
    setCouponInput('');
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Por favor ingresa la dirección de entrega.');
      } else {
        Alert.alert('Falta dirección', 'Por favor ingresa tu dirección de entrega para el envío.');
      }
      return;
    }

    const orderData = {
      orderId: `FM-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cart,
      subtotal,
      descuento,
      costoEnvio,
      total,
      deliveryType,
      selectedDate: DELIVERY_DATES.find((d) => d.id === selectedDate)?.label,
      sucursal: deliveryType === 'pickup' ? SUCURSALES.find((s) => s.id === selectedSucursal)?.nombre : null,
      address: deliveryType === 'delivery' ? deliveryAddress : null,
      customerName: customerName || 'Cliente Especial',
      customerPhone: customerPhone || 'No especificado',
      date: new Date().toLocaleDateString('es-MX'),
    };

    onCheckoutSuccess(orderData);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let itemsText = cart
      .map(
        (item) =>
          `• ${item.cantidad}x ${item.nombre}\n  (Cobertura: ${item.coberturaElegida} | Relleno: ${item.rellenoElegido}) -> $${item.precioTotal} MXN`
      )
      .join('\n');

    let dateText = DELIVERY_DATES.find((d) => d.id === selectedDate)?.label || 'Hoy';
    let deliveryInfoText =
      deliveryType === 'delivery'
        ? `🛵 Envío a domicilio: ${deliveryAddress || 'Por confirmar'}`
        : `🏬 Recoger en: ${SUCURSALES.find((s) => s.id === selectedSucursal)?.nombre}`;

    let couponText = appliedCoupon ? `\n🎟️ Cupón aplicado: ${appliedCoupon.codigo} (-$${descuento} MXN)` : '';

    let message = `*¡Hola Flor & Miga! Quiero ordenar Pan de Muerto Sin Gluten:*\n\n` +
      `📅 Fecha de entrega: ${dateText}\n` +
      `${deliveryInfoText}\n` +
      (customerName ? `👤 Cliente: ${customerName}\n\n` : '\n') +
      `*Productos:*\n${itemsText}\n` +
      couponText +
      `\n*Subtotal:* $${subtotal} MXN\n` +
      (costoEnvio > 0 ? `*Envío:* $${costoEnvio} MXN\n` : `*Envío:* ¡GRATIS!\n`) +
      `*TOTAL A PAGAR: $${total} MXN*\n\n` +
      `¿Tienen disponibilidad para apartar mi pedido? Muchas gracias.`;

    const encoded = encodeURI(message);
    const waUrl = `https://wa.me/525512345678?text=${encoded}`;
    Linking.openURL(waUrl).catch(() => {
      if (Platform.OS === 'web') {
        window.open(waUrl, '_blank');
      }
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mi Carrito ({cart.length})</Text>
            {cart.length > 0 ? (
              <TouchableOpacity onPress={onClearCart}>
                <Text style={styles.clearCartText}>Vaciar</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 40 }} />
            )}
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🥖</Text>
              <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
              <Text style={styles.emptySubtitle}>
                Elige tus panes de muerto sin gluten favoritos o nuestros combos familiares de Día de Muertos.
              </Text>
              <TouchableOpacity style={styles.exploreButton} onPress={onClose}>
                <Text style={styles.exploreButtonText}>Ver Catálogo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              {/* Barra de envío gratis para incrementar el ticket promedio */}
              {deliveryType === 'delivery' && (
                <View style={styles.freeShippingBanner}>
                  {faltaParaEnvioGratis > 0 ? (
                    <Text style={styles.freeShippingText}>
                      ¡Agrega <Text style={styles.boldText}>${faltaParaEnvioGratis} MXN</Text> más para{' '}
                      <Text style={styles.boldGreen}>Envío GRATIS</Text>! 🛵
                    </Text>
                  ) : (
                    <Text style={styles.freeShippingSuccess}>
                      🎉 ¡Felicidades! Calificas para <Text style={styles.boldGreen}>Envío GRATIS</Text>
                    </Text>
                  )}
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${porcentajeEnvioGratis}%` },
                      ]}
                    />
                  </View>
                </View>
              )}

              {/* Lista de Productos en el Carrito */}
              <View style={styles.itemsSection}>
                <Text style={styles.sectionHeader}>Productos en tu Pedido:</Text>
                {cart.map((item) => (
                  <View key={item.cartItemId} style={styles.cartCard}>
                    <Image source={item.imagen} style={styles.itemImage} resizeMode="cover" />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.nombre}
                      </Text>
                      <Text style={styles.itemOptions}>
                        Cobertura: {item.coberturaElegida}
                      </Text>
                      <Text style={styles.itemOptions}>
                        Relleno: {item.rellenoElegido}
                      </Text>

                      <View style={styles.itemPriceRow}>
                        <Text style={styles.itemTotal}>${item.precioTotal} MXN</Text>
                        <Text style={styles.itemUnit}>(${item.precioUnitario} c/u)</Text>
                      </View>
                    </View>

                    {/* Controles de Cantidad */}
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQuantity(item.cartItemId, item.cantidad - 1)}
                      >
                        <Text style={styles.qtyBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumber}>{item.cantidad}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQuantity(item.cartItemId, item.cantidad + 1)}
                      >
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => onRemoveItem(item.cartItemId)}
                      >
                        <Text style={styles.deleteBtnText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              {/* Selector de Fecha de Entrega / Horneada */}
              <View style={styles.configSection}>
                <Text style={styles.sectionHeader}>📅 Selecciona Fecha de Horneada / Entrega:</Text>
                {DELIVERY_DATES.map((date) => {
                  const isSelected = selectedDate === date.id;
                  return (
                    <TouchableOpacity
                      key={date.id}
                      style={[styles.dateCard, isSelected && styles.dateCardActive]}
                      onPress={() => setSelectedDate(date.id)}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.dateLabel, isSelected && styles.dateLabelActive]}>
                          {date.label}
                        </Text>
                        <Text style={styles.dateSub}>{date.detalle}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Datos de Entrega */}
              <View style={styles.configSection}>
                <Text style={styles.sectionHeader}>
                  {deliveryType === 'delivery' ? '📍 Dirección de Envío:' : '🏬 Sucursal de Entrega:'}
                </Text>

                {deliveryType === 'delivery' ? (
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Calle, número, colonia y código postal"
                      placeholderTextColor="#9CA3AF"
                      value={deliveryAddress}
                      onChangeText={setDeliveryAddress}
                    />
                    <TextInput
                      style={[styles.textInput, { marginTop: 8 }]}
                      placeholder="Nombre de quien recibe (opcional)"
                      placeholderTextColor="#9CA3AF"
                      value={customerName}
                      onChangeText={setCustomerName}
                    />
                    <TextInput
                      style={[styles.textInput, { marginTop: 8 }]}
                      placeholder="Teléfono celular para coordinar llegada"
                      placeholderTextColor="#9CA3AF"
                      value={customerPhone}
                      onChangeText={setCustomerPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                ) : (
                  <View>
                    {SUCURSALES.map((suc) => {
                      const isSelected = selectedSucursal === suc.id;
                      return (
                        <TouchableOpacity
                          key={suc.id}
                          style={[styles.sucursalCard, isSelected && styles.sucursalCardActive]}
                          onPress={() => setSelectedSucursal(suc.id)}
                        >
                          <Text style={[styles.sucursalTitle, isSelected && styles.sucursalTitleActive]}>
                            {suc.nombre}
                          </Text>
                          <Text style={styles.sucursalAddress}>{suc.direccion}</Text>
                          <Text style={styles.sucursalTime}>Horario: {suc.horario}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>

              {/* Sección de Cupón de Descuento */}
              <View style={styles.couponSection}>
                <Text style={styles.sectionHeader}>🎟️ ¿Tienes un Cupón de Descuento?</Text>
                <View style={styles.couponRow}>
                  <TextInput
                    style={styles.couponInput}
                    placeholder="Ej. SINGLUTEN10 o OFRENDA50"
                    placeholderTextColor="#9CA3AF"
                    value={couponInput}
                    onChangeText={setCouponInput}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity style={styles.applyCouponBtn} onPress={handleApplyCoupon}>
                    <Text style={styles.applyCouponBtnText}>Aplicar</Text>
                  </TouchableOpacity>
                </View>

                {couponError ? <Text style={styles.errorText}>{couponError}</Text> : null}

                {appliedCoupon && (
                  <View style={styles.couponBadgeSuccess}>
                    <Text style={styles.couponBadgeText}>
                      ✓ Cupón Activo: {appliedCoupon.codigo} ({appliedCoupon.descripcion})
                    </Text>
                  </View>
                )}
              </View>

              {/* Resumen de Cuenta */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Resumen del Pedido</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${subtotal} MXN</Text>
                </View>

                {descuento > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.discountLabel}>Descuento Cupón</Text>
                    <Text style={styles.discountValue}>-${descuento} MXN</Text>
                  </View>
                )}

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Envío {deliveryType === 'pickup' ? '(Recoger)' : ''}
                  </Text>
                  <Text style={costoEnvio === 0 ? styles.freeShippingTextSm : styles.summaryValue}>
                    {costoEnvio === 0 ? '¡GRATIS!' : `$${costoEnvio} MXN`}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRowTotal}>
                  <Text style={styles.totalLabel}>TOTAL A PAGAR</Text>
                  <Text style={styles.totalValue}>${total} MXN</Text>
                </View>
                <Text style={styles.securityNote}>
                  🔒 Compra 100% segura • Garantía de horneado sin gluten
                </Text>
              </View>
            </ScrollView>
          )}

          {/* Footer de Acciones del Carrito */}
          {cart.length > 0 && (
            <View style={styles.footer}>
              {/* Botón WhatsApp */}
              <TouchableOpacity
                style={styles.whatsAppButton}
                onPress={handleWhatsAppOrder}
                activeOpacity={0.85}
              >
                <Text style={styles.whatsAppButtonText}>💬 Ordenar por WhatsApp</Text>
              </TouchableOpacity>

              {/* Botón Pago / Confirmar */}
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleConfirmOrder}
                activeOpacity={0.85}
              >
                <Text style={styles.checkoutButtonText}>
                  Confirmar Pedido (${total} MXN)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4B5563',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
  clearCartText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#D97706',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  scrollArea: {
    flexGrow: 0,
  },
  freeShippingBanner: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  freeShippingText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
    marginBottom: 6,
  },
  freeShippingSuccess: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '700',
    marginBottom: 6,
  },
  boldText: {
    fontWeight: '800',
    color: '#B45309',
  },
  boldGreen: {
    fontWeight: '800',
    color: '#059669',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#FDE68A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  itemsSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 8,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  itemOptions: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 4,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B45309',
  },
  itemUnit: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  itemActions: {
    alignItems: 'center',
    gap: 4,
    marginLeft: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  qtyNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1F2937',
  },
  deleteBtn: {
    marginTop: 4,
    padding: 2,
  },
  deleteBtnText: {
    fontSize: 12,
  },
  configSection: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  dateCardActive: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 10,
  },
  radioCircleActive: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  dateLabelActive: {
    fontWeight: '800',
    color: '#92400E',
  },
  dateSub: {
    fontSize: 10,
    color: '#6B7280',
  },
  inputGroup: {
    marginTop: 4,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: '#111827',
  },
  sucursalCard: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  sucursalCardActive: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  sucursalTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  sucursalTitleActive: {
    color: '#92400E',
  },
  sucursalAddress: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  sucursalTime: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
  couponSection: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  couponRow: {
    flexDirection: 'row',
    gap: 8,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: '#111827',
    fontWeight: '700',
  },
  applyCouponBtn: {
    backgroundColor: '#451A03',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyCouponBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  couponBadgeSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  couponBadgeText: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  discountLabel: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '700',
  },
  discountValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  freeShippingTextSm: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B45309',
  },
  securityNote: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  whatsAppButton: {
    backgroundColor: '#25D366',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  whatsAppButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: '#D97706',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
