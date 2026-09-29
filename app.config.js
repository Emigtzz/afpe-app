export default {
  expo: {
    name: 'AFPE',
    slug: 'afpe-app',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTabletMode: true,
      bundleIdentifier: 'com.afpe.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.afpe.app'
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      eas: {
        projectId: 'your-project-id-here'
      }
    },
    plugins: [
      [
        'expo-notifications',
        {
          icons: ['./assets/notification-icon.png'],
          color: '#2E7D32'
        }
      ]
    ]
  }
};
