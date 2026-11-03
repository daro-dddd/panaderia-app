import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CERTIFICATIONS, HORNEADAS_HOY } from '../data/products';

export default function CertificationView({ onGoToMenu }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner de Garantía */}
      <View style={styles.heroBanner}>
        <Text style={styles.shieldIcon}>🛡️</Text>
        <Text style={styles.heroTitle}>{CERTIFICATIONS.titulo}</Text>
        <Text style={styles.heroSub}>{CERTIFICATIONS.subtitulo}</Text>
        <View style={styles.ppmBadge}>
          <Text style={styles.ppmText}>CERTIFICADO: MENOS DE 3 PPM DE GLUTEN (0.0003%)</Text>
        </View>
      </View>

      {/* Por qué comprar aquí */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Nuestros 4 Pilares de Seguridad:</Text>
        {CERTIFICATIONS.puntos.map((punto, index) => (
          <View key={index} style={styles.pilarCard}>
            <View style={styles.pilarHeader}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.pilarTitle}>{punto.titulo}</Text>
            </View>
            <Text style={styles.pilarDesc}>{punto.descripcion}</Text>
          </View>
        ))}
      </View>

      {/* Monitoreo del Horno en Tiempo Real */}
      <View style={styles.hornoCard}>
        <View style={styles.hornoHeader}>
          <Text style={styles.hornoEmoji}>🔥</Text>
          <View>
            <Text style={styles.hornoTitle}>Horneadas del Día (Lotes Frescos)</Text>
            <Text style={styles.hornoSub}>Horneamos 4 veces al día para que llegue calientito</Text>
          </View>
        </View>

        <View style={styles.batchesList}>
          {HORNEADAS_HOY.map((lote, i) => (
            <View key={i} style={[styles.batchRow, lote.urgente && styles.batchRowUrgent]}>
              <View>
                <Text style={styles.batchTime}>{lote.hora}</Text>
                <Text style={styles.batchStatus}>{lote.status}</Text>
              </View>
              <View style={styles.batchStock}>
                {lote.disponible > 0 ? (
                  <Text style={lote.urgente ? styles.stockUrgent : styles.stockNormal}>
                    {lote.disponible} panes disp.
                  </Text>
                ) : (
                  <Text style={styles.stockSold}>Agotado</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonio de Cliente */}
      <View style={styles.reviewCard}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.reviewText}>
          Tengo celiaquía desde hace 8 años y lloré cuando volví a comer un Pan de Muerto tan esponjoso y perfumado sin tener ninguna reacción. Flor & Miga es mi lugar seguro.
        </Text>
        <Text style={styles.reviewerName}>— Mariana S., Ciudad de México</Text>
        <Text style={styles.stars}>★★★★★</Text>
      </View>

      {/* Botón CTA hacia el menú */}
      <TouchableOpacity style={styles.ctaButton} onPress={onGoToMenu} activeOpacity={0.85}>
        <Text style={styles.ctaButtonText}>Ver Catálogo y Hacer Pedido 🥖</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5F0',
    padding: 16,
  },
  heroBanner: {
    backgroundColor: '#064E3B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  shieldIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ECFDF5',
    textAlign: 'center',
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 12,
    color: '#A7F3D0',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  ppmBadge: {
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#34D399',
  },
  ppmText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#451A03',
    marginBottom: 10,
  },
  pilarCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pilarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  indexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexNumber: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pilarTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    flex: 1,
  },
  pilarDesc: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
  },
  hornoCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 16,
  },
  hornoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  hornoEmoji: {
    fontSize: 28,
  },
  hornoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#92400E',
  },
  hornoSub: {
    fontSize: 11,
    color: '#B45309',
  },
  batchesList: {
    gap: 8,
  },
  batchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  batchRowUrgent: {
    borderColor: '#D97706',
    backgroundColor: '#FEF3C7',
  },
  batchTime: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  batchStatus: {
    fontSize: 11,
    color: '#6B7280',
  },
  batchStock: {
    alignItems: 'flex-end',
  },
  stockNormal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  stockUrgent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
  },
  stockSold: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    position: 'relative',
  },
  quoteMark: {
    fontSize: 40,
    lineHeight: 30,
    color: '#FBBF24',
    fontFamily: 'serif',
  },
  reviewText: {
    fontSize: 12,
    color: '#4B5563',
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  stars: {
    color: '#F59E0B',
    fontSize: 14,
    marginTop: 2,
  },
  ctaButton: {
    backgroundColor: '#D97706',
    paddingVertical: 14,
    borderRadius: 12,
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
  },
});
