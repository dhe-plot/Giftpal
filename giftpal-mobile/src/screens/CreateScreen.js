import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const createOptions = [
    {
      id: 'share-story',
      title: 'Share Your Story',
      subtitle: '✨ Tell the world about your amazing gift discovery!',
      icon: 'heart',
      gradient: ['#ec4899', '#be185d'],
      featured: true,
      onPress: () => {
        navigation.navigate('ShareStory');
      },
    },
    {
      id: 'gift-post',
      title: 'Gift Post',
      subtitle: 'Share a gift you found or received',
      icon: 'gift',
      gradient: ['#10b981', '#059669'],
      onPress: () => {
        Alert.alert('Gift Post', 'Create a gift post feature coming soon!');
      },
    },
    {
      id: 'gift-story',
      title: 'Gift Story',
      subtitle: 'Share your gift story with others',
      icon: 'book',
      gradient: ['#8b5cf6', '#7c3aed'],
      onPress: () => {
        navigation.navigate('ShareStory');
      },
    },
    {
      id: 'gift-list',
      title: 'Gift List',
      subtitle: 'Create a wishlist or gift guide',
      icon: 'list',
      gradient: ['#f59e0b', '#d97706'],
      onPress: () => {
        Alert.alert('Gift List', 'Create a gift list feature coming soon!');
      },
    },
    {
      id: 'sell-gift',
      title: 'Sell a Gift',
      subtitle: 'List a gift item for sale',
      icon: 'storefront',
      gradient: ['#ef4444', '#dc2626'],
      onPress: () => {
        Alert.alert('Seller Dashboard', 'Seller dashboard feature coming soon!');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured: Share Your Story */}
        <TouchableOpacity
          style={styles.featuredStoryCard}
          onPress={() => navigation.navigate('ShareStory')}
        >
          <LinearGradient
            colors={['#ec4899', '#be185d']}
            style={styles.featuredGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.featuredContent}>
              <View style={styles.featuredIcon}>
                <Ionicons name="heart" size={32} color="#fff" />
              </View>
              <View style={styles.featuredText}>
                <Text style={styles.featuredTitle}>Share Your Story</Text>
                <Text style={styles.featuredSubtitle}>✨ Tell the world about your amazing gift discovery!</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Camera/Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Add Photo</Text>
          <View style={styles.photoOptions}>
            <TouchableOpacity style={styles.photoOption} onPress={takePhoto}>
              <View style={styles.photoIconContainer}>
                <Ionicons name="camera" size={32} color="#6b7280" />
              </View>
              <Text style={styles.photoOptionText}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.photoOption} onPress={pickImage}>
              <View style={styles.photoIconContainer}>
                <Ionicons name="images" size={32} color="#6b7280" />
              </View>
              <Text style={styles.photoOptionText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Create Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>More Creation Options</Text>
          {createOptions.filter(option => !option.featured).map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <LinearGradient
                colors={option.gradient}
                style={styles.optionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionIcon}>
                    <Ionicons name={option.icon} size={24} color="#fff" />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="scan" size={24} color="#10b981" />
              <Text style={styles.quickActionText}>Scan Gift</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="heart" size={24} color="#ef4444" />
              <Text style={styles.quickActionText}>Add to Wishlist</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="share" size={24} color="#3b82f6" />
              <Text style={styles.quickActionText}>Share Gift</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  featuredStoryCard: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  featuredGradient: {
    padding: 20,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  featuredSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  photoSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  photoOption: {
    alignItems: 'center',
  },
  photoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoOptionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedImageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  optionsSection: {
    marginBottom: 30,
  },
  optionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
});
