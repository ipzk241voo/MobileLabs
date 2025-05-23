import { initializeApp, InitializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxO6LuUhRWvO7wXBQqKBX2_S7fQrbeRCA",
  authDomain: "ndpowerlab6.firebaseapp.com",
  projectId: "ndpowerlab6",
  storageBucket: "ndpowerlab6.firebasestorage.app",
  messagingSenderId: "655206773109",
  appId: "1:655206773109:web:f0a3c7ec27170b881b233c",
  measurementId: "G-E2QWW0QE78"

};

const app = initializeApp(firebaseConfig);

const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { authentication, db };
