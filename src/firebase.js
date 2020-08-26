import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA80vnQsv6uEqmuS416N53VAHjLSWAJe2Q",
    authDomain: "my-twitter-1c065.firebaseapp.com",
    databaseURL: "https://my-twitter-1c065.firebaseio.com",
    projectId: "my-twitter-1c065",
    storageBucket: "my-twitter-1c065.appspot.com",
    messagingSenderId: "451150027456",
    appId: "1:451150027456:web:65811eb795edb510ca6b25"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;