// ===============================
// MISHRA CLASSES FIREBASE CONFIG
// ===============================


// Firebase SDK Imports

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";




// Your Firebase Configuration
// Firebase Console se apna config yaha paste karo


const firebaseConfig = {

apiKey: "AIzaSyA7qR0wwG8OaZs87V0TMpecXtwqbdVKirg",

authDomain: "p-key-vm8aln657b15.firebaseapp.com",

projectId: "p-key-vm8aln657b15",

storageBucket: "p-key-vm8aln657b15.firebasestorage.app",

messagingSenderId: "294261738203",

appId: "1:294261738203:web:9c3b0a47f495e760909afe",

};





// Initialize Firebase


const app = initializeApp(firebaseConfig);





// Firebase Services


export const auth = getAuth(app);


export const db = getFirestore(app);
