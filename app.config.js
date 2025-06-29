import 'dotenv/config';

export default {
  "expo": {
    "name": "firebase-chatapp",
    "slug": "firebase-chatapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    // "experiments": {
    //   "typedRoutes": true
    // }
    extra: {
      apiKey: "AIzaSyCYYuCXAOR9niVEYELcMxGKiuAmgdQU1wY",
      authDomain: "chatapp-ab7c6.firebaseapp.com",
      projectId: "chatapp-ab7c6",
      storageBucket: "chatapp-ab7c6.firebasestorage.app",
      messagingSenderId: "859821250661",
      appId: "1:859821250661:web:0fcfe11313985df008ce8c"
    }
  }
}
