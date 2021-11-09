import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa57ehMe6uaWm4sqKTEkzCPDVilO1UAvY",
  authDomain: "tmdb-huynh.firebaseapp.com",
  projectId: "tmdb-huynh",
  storageBucket: "tmdb-huynh.appspot.com",
  messagingSenderId: "976678230795",
  appId: "1:976678230795:web:8d1d6e268db9f340d3600e",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }; //chuyển default export thành named export
