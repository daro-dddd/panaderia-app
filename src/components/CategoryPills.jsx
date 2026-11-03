import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/products';

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectCategory(cat.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pillSelected: {
    backgroundColor: '#78350F',
    borderColor: '#78350F',
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  pillTextSelected: {
    color: '#FFFBEB',
  },
});
