import firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyDmaCwOP3cpcVj91VGNPrHopr234Z_6f3o",
    authDomain: "boardhoard.firebaseapp.com",
    databaseURL: "https://boardhoard.firebaseio.com",
    projectId: "Boardhoard",
    storageBucket: "boardhoard.appspot.com",
    messagingSenderId: "736982039678"
};


export const app = firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
