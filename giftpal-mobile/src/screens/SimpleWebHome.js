import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const SimpleWebHome = () => {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🎁 GIFTPAL</Text>
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
          <Text style={styles.themeIcon}>☀️</Text>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Featured Stories Header */}
        <View style={styles.storiesHeader}>
          <Text style={styles.featuredTitle}>Featured Stories</Text>
          <TouchableOpacity style={styles.shareStoryButton}>
            <Text style={styles.addIcon}>+</Text>
            <Text style={styles.shareStoryText}>Share Your Story</Text>
          </TouchableOpacity>
        </View>

        {/* Story Card */}
        <View style={styles.storyCard}>
          <View style={styles.storyHeader}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face' }} 
              style={styles.userAvatar} 
            />
            <View style={styles.userInfo}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>Sarah Chen</Text>
                <View style={styles.giftMasterBadge}>
                  <Text style={styles.badgeText}>🎁 Gift Master</Text>
                </View>
              </View>
              <Text style={styles.userStats}>1250 followers • 89 gifts given</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.storyTitle}>Perfect Anniversary Surprise</Text>
          <Text style={styles.storyContent}>
            Found the most amazing personalized jewelry for my husband's 5th anniversary. 
            The craftsmanship was incredible and his reaction was priceless! 💎✨
          </Text>

          {/* Product Card */}
          <View style={styles.productCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' }} 
              style={styles.productImage} 
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Custom Engraved Watch</Text>
              <Text style={styles.productPrice}>$299</Text>
            </View>
            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          {/* Story Actions */}
          <View style={styles.storyActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>❤️</Text>
              <Text style={styles.actionText}>42</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>8</Text>
            </TouchableOpacity>
            <Text style={styles.timeAgo}>2 hours ago</Text>
          </View>
        </View>

        {/* Featured Gifts Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Featured Gifts</Text>
          <View style={styles.sidebarGiftCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop' }} 
              style={styles.sidebarGiftImage} 
            />
            <Text style={styles.sidebarGiftTitle}>Luxury Spa Set</Text>
            <Text style={styles.sidebarGiftPrice}>$89.99</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 4,
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#94a3b8',
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
  themeIcon: {
    fontSize: 20,
    marginRight: 15,
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
  addIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  shareStoryText: {
    color: 'white',
    fontWeight: '600',
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
    marginBottom: 15,
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
  actionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  actionText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  timeAgo: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 'auto',
  },
  sidebar: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 16,
  },
  sidebarGiftCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
  },
  sidebarGiftImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  sidebarGiftTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sidebarGiftPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

export default SimpleWebHome;
