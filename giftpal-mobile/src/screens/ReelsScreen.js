import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ReelsScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Mock data for gift stories/reels
  const giftReels = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: true,
      },
      gift: {
        title: 'Handmade Ceramic Mug',
        price: '$45',
        category: 'Home & Living',
      },
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=600&fit=crop',
      story: 'Found this beautiful handmade mug at a local artisan market. Perfect for my morning coffee ritual! ☕️',
      likes: 234,
      comments: 18,
      shares: 12,
      isLiked: false,
      isSaved: false,
    },
    {
      id: '2',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: false,
      },
      gift: {
        title: 'Vintage Leather Journal',
        price: '$78',
        category: 'Stationery',
      },
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
      story: 'This vintage leather journal is perfect for my daily thoughts and sketches. The craftsmanship is incredible! 📝',
      likes: 156,
      comments: 23,
      shares: 8,
      isLiked: true,
      isSaved: true,
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: true,
      },
      gift: {
        title: 'Succulent Garden Kit',
        price: '$32',
        category: 'Plants & Garden',
      },
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=600&fit=crop',
      story: 'Started my succulent garden with this amazing kit! Perfect for beginners like me 🌱',
      likes: 189,
      comments: 31,
      shares: 15,
      isLiked: false,
      isSaved: false,
    },
  ];

  const toggleLike = (id) => {
    // Handle like functionality
    console.log('Toggle like for:', id);
  };

  const toggleSave = (id) => {
    // Handle save functionality
    console.log('Toggle save for:', id);
  };

  const renderReelItem = ({ item, index }) => (
    <View style={styles.reelContainer}>
      {/* Background Image */}
      <Image source={{ uri: item.image }} style={styles.backgroundImage} />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        style={styles.gradientOverlay}
      />

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gift Stories</Text>
        <TouchableOpacity>
          <Ionicons name="camera" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Left Side - Story Info */}
        <View style={styles.leftContent}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
            <View style={styles.userDetails}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{item.user.name}</Text>
                {item.user.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                )}
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Story Text */}
          <Text style={styles.storyText}>{item.story}</Text>

          {/* Gift Info */}
          <View style={styles.giftInfo}>
            <Text style={styles.giftTitle}>{item.gift.title}</Text>
            <View style={styles.giftDetails}>
              <Text style={styles.giftPrice}>{item.gift.price}</Text>
              <Text style={styles.giftCategory}>{item.gift.category}</Text>
            </View>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Side - Actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleLike(item.id)}
          >
            <Ionicons
              name={item.isLiked ? "heart" : "heart-outline"}
              size={28}
              color={item.isLiked ? "#ef4444" : "#fff"}
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={28} color="#fff" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleSave(item.id)}
          >
            <Ionicons
              name={item.isSaved ? "bookmark" : "bookmark-outline"}
              size={28}
              color={item.isSaved ? "#10b981" : "#fff"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={giftReels}
        renderItem={renderReelItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 6,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  storyText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 16,
  },
  giftInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 12,
  },
  giftTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  giftDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  giftPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
    marginRight: 12,
  },
  giftCategory: {
    fontSize: 12,
    color: '#d1d5db',
  },
  shopButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  shopButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  rightActions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});
