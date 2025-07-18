import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const featuredGifts = [
    {
      id: 1,
      title: 'Luxury Spa Set',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      category: 'Wellness',
    },
    {
      id: 2,
      title: 'Artisan Coffee Collection',
      price: '$45.99',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop',
      category: 'Food & Drink',
    },
    {
      id: 3,
      title: 'Personalized Jewelry',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      category: 'Jewelry',
    },
  ];

  const categories = [
    { id: 1, name: 'Anniversary', icon: 'heart', color: '#ef4444' },
    { id: 2, name: 'Birthday', icon: 'gift', color: '#f59e0b' },
    { id: 3, name: 'Wedding', icon: 'diamond', color: '#8b5cf6' },
    { id: 4, name: 'Holiday', icon: 'snow', color: '#10b981' },
  ];

  const renderFeaturedGift = (gift) => (
    <TouchableOpacity
      key={gift.id}
      style={styles.giftCard}
      onPress={() => navigation.navigate('ProductDetail', { product: gift })}
    >
      <Image source={{ uri: gift.image }} style={styles.giftImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.giftGradient}
      >
        <Text style={styles.giftTitle}>{gift.title}</Text>
        <Text style={styles.giftPrice}>{gift.price}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCategory = (category) => (
    <TouchableOpacity key={category.id} style={styles.categoryCard}>
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Ionicons name={category.icon} size={24} color="white" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.subtitle}>Find the perfect gift</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="bag-outline" size={24} color="white" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search for gifts...</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Occasion</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map(renderCategory)}
          </View>
        </ScrollView>
      </View>

      {/* Featured Gifts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Gifts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.giftsContainer}>
            {featuredGifts.map(renderFeaturedGift)}
          </View>
        </ScrollView>
      </View>

      {/* Stories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gift Stories</Text>
        <TouchableOpacity style={styles.storyCard}>
          <LinearGradient colors={['#10b981', '#059669']} style={styles.storyGradient}>
            <Text style={styles.storyTitle}>Perfect Anniversary Surprise</Text>
            <Text style={styles.storySubtitle}>
              "Found the most amazing personalized jewelry for my husband's 5th anniversary..."
            </Text>
            <View style={styles.storyAuthor}>
              <Text style={styles.authorName}>Sarah Chen</Text>
              <View style={styles.giftGiverBadge}>
                <Text style={styles.badgeText}>🎁 Gift Giver</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  giftsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  giftCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  giftImage: {
    width: '100%',
    height: '100%',
  },
  giftGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  giftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  giftPrice: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  storyCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  storyGradient: {
    padding: 20,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  storySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  storyAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  giftGiverBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
  },
});

export default HomeScreen;
