import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Firebase configuration
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,                // Firebase API Key
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,        // Firebase Auth Domain
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,          // Firebase Project ID
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,  // Firebase Storage Bucket
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,  // Firebase Messaging Sender ID
  appId: process.env.REACT_APP_FIREBASE_APP_ID,                  // Firebase App ID
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID   // Firebase Measurement ID
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase connected successfully");
} catch (error) {
  console.error("Firebase connection failed:", error);
}

export { auth };
