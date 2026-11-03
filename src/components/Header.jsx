import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function Header({ cartCount, onOpenCart, deliveryType, onChangeDeliveryType }) {
  return (
    <View style={styles.container}>
      {/* Barra superior de anuncio de horneada fresca */}
      <View style={styles.topAnnouncement}>
        <Text style={styles.topAnnouncementText}>
          🍂 Lote Fresco: Horneada de 4:30 PM lista • ¡Solo 9 piezas disponibles!
        </Text>
      </View>

      <View style={styles.mainHeader}>
        {/* Marca y Subtítulo */}
        <View style={styles.brandContainer}>
          <View style={styles.logoRow}>
            <Text style={styles.logoIcon}>🌾</Text>
            <View>
              <Text style={styles.brandTitle}>Flor & Miga</Text>
              <View style={styles.certBadge}>
                <Text style={styles.certBadgeText}>100% LIBRE DE GLUTEN</Text>
              </View>
            </View>
          </View>
          <Text style={styles.slogan}>Panes de Muerto Artesanales • Certificado Celíaco</Text>
        </View>

        {/* Botón Carrito */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={onOpenCart}
          activeOpacity={0.8}
          accessibilityLabel="Abrir carrito"
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Selector de Modalidad: Envío vs Recoger */}
      <View style={styles.deliverySelector}>
        <TouchableOpacity
          style={[
            styles.deliveryOption,
            deliveryType === 'delivery' && styles.deliveryOptionActive,
          ]}
          onPress={() => onChangeDeliveryType('delivery')}
          activeOpacity={0.8}
        >
          <Text style={styles.deliveryEmoji}>🛵</Text>
          <Text
            style={[
              styles.deliveryText,
              deliveryType === 'delivery' && styles.deliveryTextActive,
            ]}
          >
            Envío a Domicilio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deliveryOption,
            deliveryType === 'pickup' && styles.deliveryOptionActive,
          ]}
          onPress={() => onChangeDeliveryType('pickup')}
          activeOpacity={0.8}
        >
          <Text style={styles.deliveryEmoji}>🏬</Text>
          <Text
            style={[
              styles.deliveryText,
              deliveryType === 'pickup' && styles.deliveryTextActive,
            ]}
          >
            Recoger en Sucursal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#381604',
    paddingTop: Platform.OS === 'ios' ? 44 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#602B0F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  topAnnouncement: {
    backgroundColor: '#D97706',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAnnouncementText: {
    color: '#FFFBEB',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  brandContainer: {
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 30,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FEF3C7',
    letterSpacing: 0.5,
  },
  certBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  certBadgeText: {
    color: '#ECFDF5',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  slogan: {
    fontSize: 11,
    color: '#FDE68A',
    marginTop: 4,
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#D97706',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: 12,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  cartIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  deliverySelector: {
    flexDirection: 'row',
    backgroundColor: '#270D03',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    padding: 3,
  },
  deliveryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 8,
    gap: 6,
  },
  deliveryOptionActive: {
    backgroundColor: '#92400E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryEmoji: {
    fontSize: 14,
  },
  deliveryText: {
    color: '#FDE68A',
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
