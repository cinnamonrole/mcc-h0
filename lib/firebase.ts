import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDPvmBI9JIqwe6WIJGGyS2_e_Pv7rdOgbg",
  authDomain: "mccmerge.firebaseapp.com",
  projectId: "mccmerge",
  storageBucket: "mccmerge.firebasestorage.app",
  messagingSenderId: "843997224921",
  appId: "1:843997224921:web:0125ec9ce9629f7b13c3c8",
  measurementId: "G-K2CRL9CG40"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app 