import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [likedStories, setLikedStories] = useState({});

  const featuredStories = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face',
        followers: 1250,
        giftsGiven: 89,
        isGiftMaster: true,
      },
      title: 'Perfect Anniversary Surprise',
      content: 'Found the most amazing personalized jewelry for my husband\'s 5th anniversary. The craftsmanship was incredible and his reaction was priceless! 💎✨',
      tags: ['Anniversary', 'Husband'],
      product: {
        name: 'Custom Engraved Watch',
        price: '$299',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        tags: ['Personalized', 'Luxury', 'Jewelry']
      },
      likes: 42,
      comments: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Mike Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        followers: 890,
        giftsGiven: 45,
        isGiftMaster: false,
      },
      title: 'Birthday Win for My Sister',
      content: 'She\'s been wanting this art set for months! The look on her face when she opened it was everything. Best brother award goes to me! 🎨',
      tags: ['Birthday', 'Sister'],
      product: {
        name: 'Professional Art Set',
        price: '$156',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
        tags: ['Creative', 'Art', 'Professional']
      },
      likes: 28,
      comments: 5,
      timeAgo: '5 hours ago'
    }
  ];

  const featuredGifts = [
    {
      id: 1,
      title: 'Luxury Spa Set',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      description: 'Premium spa collection for ultimate relaxation',
    },
    {
      id: 2,
      title: 'Artisan Coffee Collection',
      price: '$45.99',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop',
      description: 'Handpicked coffee beans from around the world',
    },
    {
      id: 3,
      title: 'Personalized Jewelry',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      description: 'Custom-made jewelry pieces',
    },
  ];

  const toggleLike = (storyId) => {
    setLikedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  const renderStoryCard = (story) => (
    <View key={story.id} style={styles.storyCard}>
      {/* User Header */}
      <View style={styles.storyHeader}>
        <Image source={{ uri: story.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{story.user.name}</Text>
            {story.user.isGiftMaster && (
              <View style={styles.giftMasterBadge}>
                <Text style={styles.badgeText}>🎁 Gift Master</Text>
              </View>
            )}
          </View>
          <Text style={styles.userStats}>
            {story.user.followers} followers • {story.user.giftsGiven} gifts given
          </Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Story Content */}
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Text style={styles.storyContent}>{story.content}</Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {story.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Product Card */}
      <View style={styles.productCard}>
        <Image source={{ uri: story.product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{story.product.name}</Text>
          <Text style={styles.productPrice}>{story.product.price}</Text>
          <View style={styles.productTags}>
            {story.product.tags.map((tag, index) => (
              <Text key={index} style={styles.productTag}>{tag}</Text>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Story Actions */}
      <View style={styles.storyActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(story.id)}
        >
          <Ionicons
            name={likedStories[story.id] ? "heart" : "heart-outline"}
            size={20}
            color={likedStories[story.id] ? "#ef4444" : "#94a3b8"}
          />
          <Text style={styles.actionText}>{story.likes + (likedStories[story.id] ? 1 : 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#94a3b8" />
          <Text style={styles.actionText}>{story.comments}</Text>
        </TouchableOpacity>
        <Text style={styles.timeAgo}>{story.timeAgo}</Text>
      </View>
    </View>
  );

  const renderFeaturedGift = (gift) => (
    <View key={gift.id} style={styles.sidebarGiftCard}>
      <Image source={{ uri: gift.image }} style={styles.sidebarGiftImage} />
      <View style={styles.sidebarGiftInfo}>
        <Text style={styles.sidebarGiftTitle}>{gift.title}</Text>
        <Text style={styles.sidebarGiftDescription}>{gift.description}</Text>
        <Text style={styles.sidebarGiftPrice}>{gift.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🎁</Text>
          <Text style={styles.logoTitle}>GIFTPAL</Text>
          <Text style={styles.logoSubtitle}>BY DHE PLOT</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.navLink}>
            <Text style={[styles.navText, styles.activeNav]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink}>
            <Text style={styles.navText}>Gifts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink}>
            <Text style={styles.navText}>Brands</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink}>
            <Text style={styles.navText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink}>
            <Text style={styles.navText}>Sell</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.themeToggle}>
            <Ionicons name="sunny" size={20} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Content - Stories */}
        <ScrollView style={styles.leftContent} showsVerticalScrollIndicator={false}>
          {/* Featured Stories Header */}
          <View style={styles.storiesHeader}>
            <Text style={styles.featuredTitle}>Featured Stories</Text>
            <TouchableOpacity style={styles.shareStoryButton}>
              <Ionicons name="add" size={16} color="white" />
              <Text style={styles.shareStoryText}>Share Your Story</Text>
            </TouchableOpacity>
          </View>

          {/* Story Cards */}
          {featuredStories.map(renderStoryCard)}
        </ScrollView>

        {/* Right Sidebar - Featured Gifts */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Featured Gifts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          {featuredGifts.map(renderFeaturedGift)}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    marginRight: 8,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 4,
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginHorizontal: 15,
  },
  navText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  activeNav: {
    color: '#10b981',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    marginRight: 15,
    padding: 8,
  },
  signInButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  shareStoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  shareStoryText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  storyCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  giftMasterBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  userStats: {
    fontSize: 12,
    color: '#94a3b8',
  },
  followButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  productTags: {
    flexDirection: 'row',
  },
  productTag: {
    fontSize: 10,
    color: '#94a3b8',
    backgroundColor: '#4b5563',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
  },
  buyNowButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buyNowText: {
    color: 'white',
    fontWeight: '600',
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    color: '#94a3b8',
    marginLeft: 4,
    fontSize: 14,
  },
  timeAgo: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 'auto',
  },
  sidebar: {
    width: 300,
    backgroundColor: '#1e293b',
    padding: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#374151',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  viewAllText: {
    color: '#10b981',
    fontSize: 14,
  },
  sidebarGiftCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  sidebarGiftImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  sidebarGiftInfo: {
    flex: 1,
  },
  sidebarGiftTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sidebarGiftDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  sidebarGiftPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

export default HomeScreen;
