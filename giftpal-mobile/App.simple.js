import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

// Simple screens for testing
const SimpleHome = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>🎁 GiftPal</Text>
    <Text style={styles.subtitle}>Welcome to GiftPal!</Text>
    <Text style={styles.description}>
      Your AI-powered gift recommendation app is now live on the web!
    </Text>
  </View>
);

const SimpleExplore = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>🔍 Explore</Text>
    <Text style={styles.description}>Discover amazing gifts for every occasion</Text>
  </View>
);

const SimpleGifts = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>🎁 My Gifts</Text>
    <Text style={styles.description}>Your saved and purchased gifts</Text>
  </View>
);

const SimpleProfile = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>👤 Profile</Text>
    <Text style={styles.description}>Manage your account and preferences</Text>
  </View>
);

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
        },
        headerStyle: {
          backgroundColor: '#0f172a',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen name="Home" component={SimpleHome} />
      <Tab.Screen name="Explore" component={SimpleExplore} />
      <Tab.Screen name="Gifts" component={SimpleGifts} />
      <Tab.Screen name="Profile" component={SimpleProfile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
});
