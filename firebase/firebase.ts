

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAVPB4lyr_Q9r6cErT55weftii_SeI2DME",
	authDomain: "persona-39e7c.firebaseapp.com",
	projectId: "persona-39e7c",
	storageBucket: "persona-39e7c.appspot.com",
	messagingSenderId: "856582372435",
	appId: "1:856582372435:web:625290a8698e1597185aa6"
};

const app = initializeApp(firebaseConfig);


export const firestore = getFirestore(app);
