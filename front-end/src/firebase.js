import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnumPQSAUO-LHNw5f7x7KvJyK9ls41L-o",
  authDomain: "shellhaxcks.firebaseapp.com",
  projectId: "shellhaxcks",
  storageBucket: "shellhaxcks.appspot.com",
  messagingSenderId: "530122697074",
  appId: "1:530122697074:web:1c59fc554327d698d1d5eb",
  measurementId: "G-WFKGKV53VG"
};

export const app = initializeApp(firebaseConfig)
export default getFirestore(app);
