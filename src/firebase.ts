import { instance } from './axios';
import { notifications } from 'ionicons/icons';
import { initializeApp } from "firebase/app";
import { environment, isDev } from './environments/environment';
import { getMessaging, onMessage } from "firebase/messaging";
import { getAuth, connectAuthEmulator,initializeAuth,indexedDBLocalPersistence } from "firebase/auth";
import { Capacitor } from '@capacitor/core';

export const app = initializeApp({
    apiKey: "AIzaSyAMQYGpOBTeY2fOQYnW-pxZggPfsUXb6bs",
    authDomain: "nft-discord-relay.firebaseapp.com",
    projectId: "nft-discord-relay",
    storageBucket: "nft-discord-relay.appspot.com",
    messagingSenderId: "301342258358",
    appId: "1:301342258358:web:b074b4535552ae0e6ee217",
    measurementId: "G-533CCS7B8D"
});

let auth1;
if (Capacitor.isNativePlatform()) {
    auth1 =initializeAuth(app, {
        persistence: indexedDBLocalPersistence
      })
  } else {
    auth1 = getAuth(app)
  }
  export const auth = auth1;

if (isDev) connectAuthEmulator(auth1, 'http://localhost:9099');

if (!Capacitor.isNativePlatform()) {
 const messaging = getMessaging(app);
// https://firebase.google.com/docs/cloud-messaging/js/client

onMessage(messaging, (payload) => {
    if (!payload?.notification) return;
    const { title, body } = payload.notification;
    // Create new browser notification
    new Notification(title as string, {
        body,
        icon: '/assets/site-logos/logo-transparent.png',
        badge: '/assets/site-logos/logo-transparent.png',
    });
});
}
