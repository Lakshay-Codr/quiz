import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAg9J9lTY_d0MUMAMC3n8b73mFI9m67484",
  authDomain: "authentication-1b56a.firebaseapp.com",
  databaseURL: "https://authentication-1b56a-default-rtdb.firebaseio.com",
  projectId: "authentication-1b56a",
  storageBucket: "authentication-1b56a.appspot.com",
  messagingSenderId: "67304503549",
  appId: "1:67304503549:web:490a2dddcffdb762156694"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase;