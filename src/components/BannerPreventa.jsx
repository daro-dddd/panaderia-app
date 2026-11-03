import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform } from 'react-native';

export default function BannerPreventa({ onSelectCombo, onApplyPromoCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    onApplyPromoCode('SINGLUTEN10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/pan_hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        <View style={styles.tagPreventa}>
          <Text style={styles.tagPreventaText}>PREVENTA DÍA DE MUERTOS 2026</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>¡No te quedes sin tu Pan de Muerto!</Text>
        <Text style={styles.subtitle}>
          Horneamos en tandas pequeñas para garantizar frescura y 0% contaminación cruzada.
          Aparta tus piezas para el <Text style={styles.boldHighlight}>1 y 2 de Noviembre</Text>.
        </Text>

        {/* Barra de progreso de cupos de preventa */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>🔥 Cupo de Preventa del Horno:</Text>
            <Text style={styles.progressPercent}>78% Reservado</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '78%' }]} />
          </View>
        </View>

        {/* Cupón comercial para incentivar compra */}
        <View style={styles.promoCouponBox}>
          <View style={styles.couponInfo}>
            <Text style={styles.couponTag}>CUPÓN DE BIENVENIDA</Text>
            <Text style={styles.couponCode}>SINGLUTEN10</Text>
            <Text style={styles.couponSub}>10% OFF en tu primer pedido</Text>
          </View>
          <TouchableOpacity
            style={[styles.applyButton, copied && styles.applyButtonActive]}
            onPress={handleCopyCode}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>
              {copied ? '✓ APLICADO' : 'APLICAR'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón CTA para saltar a combos familiares */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onSelectCombo}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaButtonText}>Ver Cajas y Combos Familiares 🎁</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FED7AA',
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(56, 22, 4, 0.45)',
  },
  tagPreventa: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  tagPreventaText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#451A03',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#573319',
    lineHeight: 18,
    marginBottom: 12,
  },
  boldHighlight: {
    fontWeight: '700',
    color: '#B45309',
  },
  progressContainer: {
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#FDE68A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D97706',
    borderRadius: 4,
  },
  promoCouponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  couponInfo: {
    flex: 1,
  },
  couponTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 0.5,
  },
  couponCode: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1F2937',
    letterSpacing: 1,
    marginVertical: 1,
  },
  couponSub: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#451A03',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  applyButtonActive: {
    backgroundColor: '#059669',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  ctaButton: {
    backgroundColor: '#D97706',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
