import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDmaCwOP3cpcVj91VGNPrHopr234Z_6f3o",
    authDomain: "boardhoard.firebaseapp.com",
    databaseURL: "https://boardhoard.firebaseio.com",
    projectId: "Boardhoard",
    storageBucket: "boardhoard.appspot.com",
    messagingSenderId: "736982039678"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;