import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';

export default function OrderSuccessModal({ visible, orderData, onClose }) {
  if (!orderData) return null;

  const handleShareTicket = async () => {
    const text = `🎉 ¡Mi pedido de Pan de Muerto Sin Gluten #${orderData.orderId} en Flor & Miga está confirmado! Total: $${orderData.total} MXN.`;
    if (Platform.OS !== 'web') {
      try {
        await Share.share({ message: text });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Encabezado de Éxito */}
            <View style={styles.successHeader}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <Text style={styles.successTitle}>¡Pedido Confirmado!</Text>
              <Text style={styles.successSubtitle}>
                Hemos apartado tus panes de muerto en la lista de horneada fresca.
              </Text>
            </View>

            {/* Ticket Digital */}
            <View style={styles.ticket}>
              <View style={styles.ticketTopRow}>
                <View>
                  <Text style={styles.ticketLabel}>FOLIO DE PEDIDO</Text>
                  <Text style={styles.ticketId}>#{orderData.orderId}</Text>
                </View>
                <View style={styles.guaranteePill}>
                  <Text style={styles.guaranteeText}>100% GLUTEN FREE</Text>
                </View>
              </View>

              <View style={styles.ticketDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fecha de Entrega:</Text>
                <Text style={styles.detailValue}>{orderData.selectedDate}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Modalidad:</Text>
                <Text style={styles.detailValue}>
                  {orderData.deliveryType === 'delivery' ? '🛵 Envío a Domicilio' : '🏬 Recoger en Tienda'}
                </Text>
              </View>

              {orderData.deliveryType === 'delivery' && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Dirección:</Text>
                  <Text style={styles.detailValueAddress} numberOfLines={2}>
                    {orderData.address || 'Registrada'}
                  </Text>
                </View>
              )}

              {orderData.deliveryType === 'pickup' && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Sucursal:</Text>
                  <Text style={styles.detailValue}>{orderData.sucursal}</Text>
                </View>
              )}

              <View style={styles.ticketDivider} />

              <Text style={styles.itemsHeader}>Detalle de Piezas:</Text>
              {orderData.items.map((item, i) => (
                <View key={i} style={styles.itemRow}>
                  <Text style={styles.itemQuantity}>{item.cantidad}x</Text>
                  <View style={{ flex: 1, paddingHorizontal: 6 }}>
                    <Text style={styles.itemName}>{item.nombre}</Text>
                    <Text style={styles.itemOption}>{item.coberturaElegida} • {item.rellenoElegido}</Text>
                  </View>
                  <Text style={styles.itemPrice}>${item.precioTotal} MXN</Text>
                </View>
              ))}

              <View style={styles.ticketDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subtotal:</Text>
                <Text style={styles.detailValue}>${orderData.subtotal} MXN</Text>
              </View>

              {orderData.descuento > 0 && (
                <View style={styles.detailRow}>
                  <Text style={styles.discountLabel}>Descuento Cupón:</Text>
                  <Text style={styles.discountValue}>-${orderData.descuento} MXN</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Envío:</Text>
                <Text style={styles.detailValue}>
                  {orderData.costoEnvio === 0 ? 'GRATIS' : `$${orderData.costoEnvio} MXN`}
                </Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL:</Text>
                <Text style={styles.totalValue}>${orderData.total} MXN</Text>
              </View>
            </View>

            {/* Aviso Celíaco */}
            <View style={styles.noticeBox}>
              <Text style={styles.noticeText}>
                🌾 <Text style={{ fontWeight: '700' }}>Promesa Celíaca:</Text> Tu pedido se empaqueta sellado individualmente para garantizar cero contacto con harina de trigo.
              </Text>
            </View>

            {/* Botones */}
            <View style={styles.actions}>
              {Platform.OS !== 'web' && (
                <TouchableOpacity style={styles.shareButton} onPress={handleShareTicket}>
                  <Text style={styles.shareButtonText}>Compartir Ticket 📤</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.doneButton} onPress={onClose}>
                <Text style={styles.doneButtonText}>Volver a la Tienda</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    padding: 20,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
  },
  ticket: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 14,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketLabel: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ticketId: {
    fontSize: 18,
    fontWeight: '900',
    color: '#78350F',
  },
  guaranteePill: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  guaranteeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  ticketDivider: {
    height: 1,
    backgroundColor: '#FDE68A',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 11,
    color: '#78350F',
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#451A03',
  },
  detailValueAddress: {
    fontSize: 11,
    fontWeight: '700',
    color: '#451A03',
    maxWidth: '65%',
    textAlign: 'right',
  },
  discountLabel: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  itemsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemQuantity: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  itemName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
  },
  itemOption: {
    fontSize: 9,
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: '#78350F',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B45309',
  },
  noticeBox: {
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  noticeText: {
    fontSize: 11,
    color: '#065F46',
    lineHeight: 15,
  },
  actions: {
    gap: 8,
  },
  shareButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '700',
  },
  doneButton: {
    backgroundColor: '#D97706',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
