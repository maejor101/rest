
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDZl_sarq1IqJ4MwK_JBbdwM-LcP_xhtJc",
    authDomain: "flakacloud-96678.firebaseapp.com",
    projectId: "flakacloud-96678",
    storageBucket: "flakacloud-96678.appspot.com",
    messagingSenderId: "973699976636",
    appId: "1:973699976636:web:285e8d43500f23fac5efb9",
    measurementId: "G-GR0QPCGGVR"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db };
