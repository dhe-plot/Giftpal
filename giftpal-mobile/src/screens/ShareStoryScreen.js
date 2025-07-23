import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function ShareStoryScreen({ navigation }) {
  const [storyText, setStoryText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [giftDetails, setGiftDetails] = useState({
    name: '',
    price: '',
    occasion: '',
    recipient: '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };

  const shareStory = () => {
    if (!storyText.trim()) {
      Alert.alert('Missing Story', 'Please write your gift story before sharing.');
      return;
    }

    Alert.alert(
      'Story Shared! 🎉',
      'Your gift story has been shared with the GiftPal community!',
      [
        {
          text: 'View Story',
          onPress: () => navigation.navigate('Reels'),
        },
        {
          text: 'Share Another',
          onPress: () => {
            setStoryText('');
            setSelectedImages([]);
            setGiftDetails({ name: '', price: '', occasion: '', recipient: '' });
          },
        },
      ]
    );
  };

  const storyPrompts = [
    "Tell us about this amazing gift you found...",
    "What made this gift special?",
    "Share the story behind this gift...",
    "How did you discover this perfect gift?",
    "What was the recipient's reaction?",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Your Story</Text>
        <TouchableOpacity onPress={shareStory} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Story Prompt */}
        <View style={styles.promptSection}>
          <Text style={styles.promptTitle}>✨ Share Your Gift Story</Text>
          <Text style={styles.promptSubtitle}>
            Tell the GiftPal community about your amazing gift discovery!
          </Text>
        </View>

        {/* Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Add Photos</Text>
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.photoAction} onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="#10b981" />
              <Text style={styles.photoActionText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoAction} onPress={pickImage}>
              <Ionicons name="images" size={24} color="#10b981" />
              <Text style={styles.photoActionText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreview}>
              {selectedImages.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Story Text */}
        <View style={styles.storySection}>
          <Text style={styles.sectionTitle}>Your Story</Text>
          <TextInput
            style={styles.storyInput}
            placeholder={storyPrompts[Math.floor(Math.random() * storyPrompts.length)]}
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={6}
            value={storyText}
            onChangeText={setStoryText}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{storyText.length}/500</Text>
        </View>

        {/* Gift Details */}
        <View style={styles.giftDetailsSection}>
          <Text style={styles.sectionTitle}>Gift Details (Optional)</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.detailInput}
              placeholder="Gift name"
              placeholderTextColor="#9ca3af"
              value={giftDetails.name}
              onChangeText={(text) => setGiftDetails({...giftDetails, name: text})}
            />
            <TextInput
              style={[styles.detailInput, styles.priceInput]}
              placeholder="Price"
              placeholderTextColor="#9ca3af"
              value={giftDetails.price}
              onChangeText={(text) => setGiftDetails({...giftDetails, price: text})}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.detailInput}
              placeholder="Occasion (Birthday, Anniversary, etc.)"
              placeholderTextColor="#9ca3af"
              value={giftDetails.occasion}
              onChangeText={(text) => setGiftDetails({...giftDetails, occasion: text})}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.detailInput}
              placeholder="Who was it for?"
              placeholderTextColor="#9ca3af"
              value={giftDetails.recipient}
              onChangeText={(text) => setGiftDetails({...giftDetails, recipient: text})}
            />
          </View>
        </View>

        {/* Story Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Story Category</Text>
          <View style={styles.categoryTags}>
            {['Gift Discovery', 'Perfect Match', 'Surprise Reaction', 'DIY Gift', 'Budget Find', 'Luxury Treat'].map((category) => (
              <TouchableOpacity key={category} style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareStoryButton} onPress={shareStory}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.shareGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="share" size={24} color="#fff" />
            <Text style={styles.shareStoryButtonText}>Share Your Story</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#10b981',
    borderRadius: 20,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  promptSection: {
    marginTop: 20,
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 16,
    color: '#047857',
    lineHeight: 22,
  },
  photoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  photoAction: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    flex: 1,
    marginHorizontal: 8,
  },
  photoActionText: {
    fontSize: 14,
    color: '#10b981',
    marginTop: 8,
    fontWeight: '500',
  },
  imagePreview: {
    marginTop: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  storySection: {
    marginBottom: 24,
  },
  storyInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#f9fafb',
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  giftDetailsSection: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  priceInput: {
    flex: 0.4,
    marginRight: 0,
  },
  categoriesSection: {
    marginBottom: 32,
  },
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryTagText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  shareStoryButton: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  shareGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  shareStoryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
});
