import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const GiftCard = ({ 
  gift, 
  onPress, 
  onFavoritePress, 
  isFavorite = false,
  style = {},
  showGradient = true 
}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={12}
        color="#fbbf24"
      />
    ));
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress && onPress(gift)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: gift.image }} style={styles.image} />
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress && onFavoritePress(gift)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#ef4444' : '#64748b'}
          />
        </TouchableOpacity>

        {/* Category Badge */}
        {gift.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{gift.category}</Text>
          </View>
        )}

        {/* Gradient Overlay for better text readability */}
        {showGradient && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradient}
          />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {gift.title}
        </Text>
        
        {gift.description && (
          <Text style={styles.description} numberOfLines={2}>
            {gift.description}
          </Text>
        )}

        {/* Rating */}
        {gift.rating && (
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(gift.rating)}
            </View>
            <Text style={styles.ratingText}>
              {gift.rating} ({gift.reviews || 0})
            </Text>
          </View>
        )}

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{gift.price}</Text>
          {gift.originalPrice && (
            <Text style={styles.originalPrice}>{gift.originalPrice}</Text>
          )}
        </View>

        {/* Features/Items */}
        {gift.items && gift.items.length > 0 && (
          <View style={styles.itemsContainer}>
            {gift.items.slice(0, 2).map((item, index) => (
              <View key={index} style={styles.itemBadge}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
            {gift.items.length > 2 && (
              <Text style={styles.moreItems}>+{gift.items.length - 2} more</Text>
            )}
          </View>
        )}

        {/* Customization Badge */}
        {gift.customization && (
          <View style={styles.customizationBadge}>
            <Ionicons name="create-outline" size={14} color="#10b981" />
            <Text style={styles.customizationText}>{gift.customization}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  moreItems: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  customizationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  customizationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
});

export default GiftCard;
