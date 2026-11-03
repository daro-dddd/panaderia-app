import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';

export default function LoyaltyClubView({ onGoToMenu }) {
  const [stamps, setStamps] = useState(4); // 4 out of 5 sellos
  const [copied, setCopied] = useState(false);
  const referralCode = 'MIGAFRIEND-88';

  const handleShareReferral = async () => {
    const message = `🌾 ¡Te regalo $40 MXN de descuento en tu primer Pan de Muerto 100% Sin Gluten en Flor & Miga! Usa mi código: ${referralCode}`;
    if (Platform.OS === 'web') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      try {
        await Share.share({ message });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tarjeta de Lealtad Digital */}
      <View style={styles.loyaltyCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardSub}>MEMBRESÍA EXCLUSIVA</Text>
            <Text style={styles.cardTitle}>Club Calaverita Dorada</Text>
          </View>
          <Text style={styles.skullIcon}>💀✨</Text>
        </View>

        <Text style={styles.stampsGoal}>
          Colecciona 5 sellos de Pan de Muerto y tu 6to pan es completamente <Text style={styles.goldText}>GRATIS</Text>.
        </Text>

        {/* Círculos de sellos */}
        <View style={styles.stampsRow}>
          {[1, 2, 3, 4, 5].map((num) => {
            const isEarned = num <= stamps;
            return (
              <View
                key={num}
                style={[styles.stampCircle, isEarned && styles.stampCircleEarned]}
              >
                <Text style={styles.stampEmoji}>{isEarned ? '🥖' : '⚪'}</Text>
                <Text style={[styles.stampLabel, isEarned && styles.stampLabelEarned]}>
                  {num === 5 ? '¡GRATIS!' : `#${num}`}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.statusText}>
            🔥 ¡Estás a solo <Text style={{ fontWeight: '900' }}>1 pan</Text> de tu recompensa!
          </Text>
        </View>
      </View>

      {/* Programa de Referidos para Atraer Clientes Nuevos */}
      <View style={styles.referralCard}>
        <Text style={styles.referralTitle}>🎁 Invita a un Amigo Celíaco o Amante del Pan</Text>
        <Text style={styles.referralDesc}>
          Comparte tu código personal. Tu amigo recibe <Text style={styles.bold}>$40 MXN de descuento</Text> y tú ganas <Text style={styles.bold}>$40 MXN en saldo</Text> cuando haga su primera compra.
        </Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareReferral}
            activeOpacity={0.8}
          >
            <Text style={styles.shareButtonText}>
              {copied ? '✓ COPIADO' : 'COMPARTIR'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Beneficios del Club */}
      <View style={styles.benefitsCard}>
        <Text style={styles.benefitsTitle}>Beneficios Exclusivos para Miembros:</Text>

        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitName}>Acceso Prioritario a Preventas</Text>
            <Text style={styles.benefitSub}>Reserva tus panes de muerto 48h antes que el público general.</Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitName}>Regalo en el Mes de tu Cumpleaños</Text>
            <Text style={styles.benefitSub}>Un pan de muerto gourmet gratis con cualquier pedido.</Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Text style={styles.benefitIcon}>🧪</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitName}>Pruebas de Catálogo Secreto</Text>
            <Text style={styles.benefitSub}>Degusta nuevos rellenos artesanales antes de que salgan a la venta.</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={onGoToMenu} activeOpacity={0.85}>
        <Text style={styles.ctaButtonText}>Comprar Ahora y Sumar Sellos 🥖</Text>
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
  loyaltyCard: {
    backgroundColor: '#381604',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    marginBottom: 16,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardSub: {
    color: '#FDE68A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FEF3C7',
    marginTop: 2,
  },
  skullIcon: {
    fontSize: 28,
  },
  stampsGoal: {
    fontSize: 12,
    color: '#FED7AA',
    lineHeight: 17,
    marginBottom: 16,
  },
  goldText: {
    color: '#FBBF24',
    fontWeight: '900',
  },
  stampsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stampCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#270D03',
    borderWidth: 1.5,
    borderColor: '#78350F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampCircleEarned: {
    backgroundColor: '#92400E',
    borderColor: '#F59E0B',
  },
  stampEmoji: {
    fontSize: 18,
  },
  stampLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    marginTop: 1,
  },
  stampLabelEarned: {
    color: '#FEF3C7',
  },
  cardFooter: {
    backgroundColor: '#451A03',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    color: '#FDE68A',
    fontSize: 11,
  },
  referralCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  referralTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
  },
  referralDesc: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginBottom: 12,
  },
  bold: {
    fontWeight: '800',
    color: '#B45309',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 1,
  },
  shareButton: {
    backgroundColor: '#D97706',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 20,
  },
  benefitName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  benefitSub: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 15,
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
