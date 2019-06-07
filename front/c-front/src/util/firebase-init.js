import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const config = {};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database();
export const auth = firebase.auth();
export const authNS = firebase.auth;
export const user = firebase.auth().currentUser;
export const storage = firebase.storage().ref();
