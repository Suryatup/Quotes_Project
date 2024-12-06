import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this import for Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyAenBxS4l1MdpQQnE-tsuAKMv6nraalvsk",
    authDomain: "insta-clone-47abd.firebaseapp.com",
    databaseURL: "https://insta-clone-47abd-default-rtdb.firebaseio.com",
    projectId: "insta-clone-47abd",
    storageBucket: "insta-clone-47abd.appspot.com",
    messagingSenderId: "447664757823",
    appId: "1:447664757823:web:56b25e0d5b465024796c8a",
    measurementId: "G-VD9J9MKDL2"   
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the initialized services
export { auth, db, storage };

