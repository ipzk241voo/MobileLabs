import { initializeApp, InitializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "****************************",
  authDomain: "*.firebaseapp.com",
  projectId: "*",
  storageBucket: "*.firebasestorage.app",
  messagingSenderId: "655206773109",
  appId: "***********************",
  measurementId: "***************"

};

const app = initializeApp(firebaseConfig);

const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { authentication, db };
