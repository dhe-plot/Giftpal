# GIFTPAL Mobile App

A React Native mobile application for the GIFTPAL gift marketplace, compatible with iOS and Android platforms.

## Features

- **Home Screen**: Featured gifts, categories, and gift stories
- **Explore Screen**: Search and filter gifts by category
- **Gifts Screen**: Curated collections and personalized gifts
- **Profile Screen**: User profile, orders, and settings
- **Product Details**: Detailed product information with reviews
- **Shopping Cart**: Add items, manage quantities, and checkout

## Tech Stack

- **React Native** with Expo SDK 53
- **React Navigation** for navigation
- **Expo Linear Gradient** for beautiful gradients
- **React Native Vector Icons** for icons
- **React Native Safe Area Context** for safe area handling

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd giftpal-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
npx expo start
```

### Running on Different Platforms

#### Web Development
```bash
npm run web
# or
npx expo start --web
```

#### iOS Simulator (macOS only)
```bash
npx expo start --ios
```

#### Android Emulator
```bash
npx expo start --android
```

#### Physical Device
1. Install Expo Go app from App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in the terminal

## Building for Production

### Using EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure the project:
```bash
eas build:configure
```

4. Build for iOS:
```bash
eas build --platform ios
```

5. Build for Android:
```bash
eas build --platform android
```

### Local Builds

#### iOS (macOS only)
```bash
npx expo run:ios
```

#### Android
```bash
npx expo run:android
```

## App Store Deployment

### iOS App Store

1. Build the iOS app using EAS Build
2. Download the .ipa file
3. Upload to App Store Connect using Xcode or Transporter
4. Submit for review

### Google Play Store

1. Build the Android app using EAS Build
2. Download the .aab or .apk file
3. Upload to Google Play Console
4. Submit for review

## Project Structure

```
giftpal-mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ExploreScreen.js
│   │   ├── GiftsScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── CartScreen.js
│   └── components/
├── assets/
├── App.js
├── app.json
├── eas.json
└── package.json
```

## Configuration

### App Configuration (app.json)
- App name, version, and metadata
- Platform-specific settings
- Icon and splash screen configuration
- Permissions and capabilities

### Build Configuration (eas.json)
- Development, preview, and production build profiles
- Platform-specific build settings
- Distribution configuration

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```
API_BASE_URL=https://api.giftpal.com
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
