import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBg1Up4GcuOLy7Lx1qbPZ5BVtyGE4PtQCE",
  authDomain: "gallery-dreamsolutions.firebaseapp.com",
  databaseURL: "https://gallery-dreamsolutions.firebaseio.com",
  projectId: "gallery-dreamsolutions",
  storageBucket: "gallery-dreamsolutions.appspot.com",
  messagingSenderId: "182925511513",
  appId: "1:182925511513:web:8b1dcf86ea684354f2da48",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
