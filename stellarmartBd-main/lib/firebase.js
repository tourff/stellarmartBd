import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqm4nmVat2hmcUijB6t37ttZotGsCc6hc",
  authDomain: "stellarmartbd-a0d4b.firebaseapp.com",
  projectId: "stellarmartbd-a0d4b",
  storageBucket: "stellarmartbd-a0d4b.firebasestorage.app",
  messagingSenderId: "108894961552",
  appId: "1:108894961552:web:9f909d9b566c3845c7fd15",
  measurementId: "G-HPH0XPK1FQ"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;