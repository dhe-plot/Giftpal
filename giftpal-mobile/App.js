import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View, Image } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SimpleWebHome from './src/screens/SimpleWebHome';
import ExploreScreen from './src/screens/ExploreScreen';
import GiftsScreen from './src/screens/GiftsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

// Import new screens for Instagram-style navigation
import CreateScreen from './src/screens/CreateScreen';
import ReelsScreen from './src/screens/ReelsScreen';
import ShareStoryScreen from './src/screens/ShareStoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home tab
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={SimpleWebHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Stack.Screen
        name="ShareStory"
        component={ShareStoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Custom Profile Icon Component with notification dot
function ProfileIcon({ focused, size }) {
  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          width: size + 4,
          height: size + 4,
          borderRadius: (size + 4) / 2,
          borderWidth: focused ? 2 : 1,
          borderColor: focused ? '#10b981' : '#6b7280',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#374151',
        }}
      >
        <Ionicons
          name="person"
          size={size - 6}
          color={focused ? '#10b981' : '#6b7280'}
        />
      </View>
      {/* Notification dot */}
      <View
        style={{
          position: 'absolute',
          top: -2,
          right: -2,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: '#ef4444',
          borderWidth: 2,
          borderColor: '#1f2937',
        }}
      />
    </View>
  );
}

// Main Tab Navigator - Instagram Style
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Instagram-style icons
          if (route.name === 'Home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={focused ? '#000' : '#6b7280'}
              />
            );
          } else if (route.name === 'Search') {
            return (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                size={size}
                color={focused ? '#000' : '#6b7280'}
              />
            );
          } else if (route.name === 'Create') {
            return (
              <View
                style={{
                  width: size + 4,
                  height: size + 4,
                  borderRadius: 8,
                  borderWidth: focused ? 2 : 1,
                  borderColor: focused ? '#000' : '#6b7280',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? '#f3f4f6' : 'transparent',
                }}
              >
                <Ionicons
                  name="add"
                  size={size - 4}
                  color={focused ? '#000' : '#6b7280'}
                />
              </View>
            );
          } else if (route.name === 'Reels') {
            return (
              <View
                style={{
                  width: size + 4,
                  height: size + 4,
                  borderRadius: 8,
                  borderWidth: focused ? 2 : 1,
                  borderColor: focused ? '#000' : '#6b7280',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? '#f3f4f6' : 'transparent',
                }}
              >
                <Ionicons
                  name="play"
                  size={size - 6}
                  color={focused ? '#000' : '#6b7280'}
                />
              </View>
            );
          } else if (route.name === 'Profile') {
            return <ProfileIcon focused={focused} size={size} />;
          }

          return <Ionicons name="help-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#6b7280',
        tabBarShowLabel: false, // Hide labels like Instagram
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 85 : 65,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
