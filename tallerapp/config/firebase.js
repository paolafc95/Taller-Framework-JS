import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAqSbbh6DKYxV1z_gGkSRXtFnjt75PIfE0",
    authDomain: "tallerappjs.firebaseapp.com",
    projectId: "tallerappjs",
    storageBucket: "tallerappjs.appspot.com",
    messagingSenderId: "352390480240",
    appId: "1:352390480240:web:c3099b17857377c5c78fb5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;