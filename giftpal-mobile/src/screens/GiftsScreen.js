import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const GiftsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('curated');

  const curatedGifts = [
    {
      id: 1,
      title: 'Romantic Date Night Package',
      description: 'Perfect for couples celebrating special moments',
      price: '$149.99',
      image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop',
      items: ['Wine & Chocolate', 'Candles', 'Playlist'],
      occasion: 'Anniversary',
    },
    {
      id: 2,
      title: 'New Parent Survival Kit',
      description: 'Everything new parents need to feel supported',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
      items: ['Baby Essentials', 'Self-Care Items', 'Meal Vouchers'],
      occasion: 'Baby Shower',
    },
    {
      id: 3,
      title: 'Graduation Success Bundle',
      description: 'Celebrate achievements with style',
      price: '$199.99',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
      items: ['Professional Accessories', 'Books', 'Gift Cards'],
      occasion: 'Graduation',
    },
  ];

  const personalizedGifts = [
    {
      id: 4,
      title: 'Custom Photo Album',
      description: 'Your memories, beautifully crafted',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      customization: 'Photos & Text',
    },
    {
      id: 5,
      title: 'Engraved Watch',
      description: 'Timeless gift with personal touch',
      price: '$299.99',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
      customization: 'Engraving',
    },
    {
      id: 6,
      title: 'Custom Star Map',
      description: 'The stars from your special moment',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
      customization: 'Date & Location',
    },
  ];

  const renderCuratedGift = (gift) => (
    <TouchableOpacity
      key={gift.id}
      style={styles.curatedCard}
      onPress={() => navigation.navigate('ProductDetail', { product: gift })}
    >
      <Image source={{ uri: gift.image }} style={styles.curatedImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.curatedGradient}
      >
        <View style={styles.occasionBadge}>
          <Text style={styles.occasionText}>{gift.occasion}</Text>
        </View>
        <Text style={styles.curatedTitle}>{gift.title}</Text>
        <Text style={styles.curatedDescription}>{gift.description}</Text>
        <View style={styles.itemsList}>
          {gift.items.map((item, index) => (
            <View key={index} style={styles.itemBadge}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.curatedPrice}>{gift.price}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPersonalizedGift = (gift) => (
    <TouchableOpacity
      key={gift.id}
      style={styles.personalizedCard}
      onPress={() => navigation.navigate('ProductDetail', { product: gift })}
    >
      <Image source={{ uri: gift.image }} style={styles.personalizedImage} />
      <View style={styles.personalizedInfo}>
        <View style={styles.customBadge}>
          <Ionicons name="create-outline" size={14} color="#10b981" />
          <Text style={styles.customText}>{gift.customization}</Text>
        </View>
        <Text style={styles.personalizedTitle}>{gift.title}</Text>
        <Text style={styles.personalizedDescription}>{gift.description}</Text>
        <Text style={styles.personalizedPrice}>{gift.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gift Collections</Text>
        <TouchableOpacity style={styles.wishlistButton}>
          <Ionicons name="heart-outline" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'curated' && styles.activeTab]}
          onPress={() => setSelectedTab('curated')}
        >
          <Text style={[styles.tabText, selectedTab === 'curated' && styles.activeTabText]}>
            Curated Collections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'personalized' && styles.activeTab]}
          onPress={() => setSelectedTab('personalized')}
        >
          <Text style={[styles.tabText, selectedTab === 'personalized' && styles.activeTabText]}>
            Personalized Gifts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'curated' ? (
          <View style={styles.curatedSection}>
            <Text style={styles.sectionDescription}>
              Thoughtfully curated gift collections for every special occasion
            </Text>
            {curatedGifts.map(renderCuratedGift)}
          </View>
        ) : (
          <View style={styles.personalizedSection}>
            <Text style={styles.sectionDescription}>
              Make it uniquely theirs with personalized touches
            </Text>
            {personalizedGifts.map(renderPersonalizedGift)}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient colors={['#10b981', '#059669']} style={styles.fabGradient}>
          <Ionicons name="add" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  wishlistButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#10b981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    lineHeight: 22,
  },
  curatedSection: {
    paddingVertical: 20,
  },
  curatedCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  curatedImage: {
    width: '100%',
    height: '100%',
  },
  curatedGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  occasionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  occasionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  curatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  curatedDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    lineHeight: 18,
  },
  itemsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  itemBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 12,
    color: 'white',
  },
  curatedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  personalizedSection: {
    paddingVertical: 20,
  },
  personalizedCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personalizedImage: {
    width: 120,
    height: 120,
  },
  personalizedInfo: {
    flex: 1,
    padding: 16,
  },
  customBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  customText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  personalizedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  personalizedDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 18,
  },
  personalizedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GiftsScreen;
