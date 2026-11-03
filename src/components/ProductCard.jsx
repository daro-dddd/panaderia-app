import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onOpenDetail, onQuickAdd }) {
  return (
    <View style={styles.card}>
      {/* Contenedor de Imagen y Badge */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => onOpenDetail(product)}
        activeOpacity={0.9}
      >
        <Image
          source={product.imagen}
          style={styles.productImage}
          resizeMode="cover"
        />
        {product.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>★ {product.calificacion}</Text>
        </View>
      </TouchableOpacity>

      {/* Contenido del Producto */}
      <View style={styles.infoContainer}>
        {/* Sellos rápidos de salud */}
        <View style={styles.tagsRow}>
          {product.sellos.slice(0, 2).map((sello, i) => (
            <View key={i} style={styles.healthTag}>
              <Text style={styles.healthTagText}>{sello}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => onOpenDetail(product)} activeOpacity={0.8}>
          <Text style={styles.title} numberOfLines={2}>
            {product.nombre}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description} numberOfLines={2}>
          {product.descripcionCorta}
        </Text>

        {/* Fila de Precio y Acciones */}
        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${product.precio}</Text>
              <Text style={styles.currency}>MXN</Text>
            </View>
            {product.precioOriginal && (
              <Text style={styles.originalPrice}>${product.precioOriginal} MXN</Text>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => onOpenDetail(product)}
              activeOpacity={0.7}
            >
              <Text style={styles.detailButtonText}>Detalles</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onQuickAdd(product)}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>+ Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3E8E2',
    shadowColor: '#451A03',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F7EDE8',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#B45309',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    color: '#FFFBEB',
    fontSize: 11,
    fontWeight: '800',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(30, 20, 15, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  healthTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#A7F3D0',
  },
  healthTagText: {
    color: '#065F46',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#29150B',
    lineHeight: 22,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
    color: '#B45309',
  },
  currency: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78350F',
  },
  originalPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  detailButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  detailButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  addButton: {
    backgroundColor: '#D97706',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
