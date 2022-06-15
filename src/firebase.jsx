import firebase from "firebase/compat/app";
import "firebase/compat/auth";

//本来ならローカルを読み込む
//今回は割愛
const firebaseConfig = {
  apiKey: "AIzaSyBHpuVknGk-I6cU07t9eKTkPYAKA6SYqHg",
  authDomain: "kurogo-f196b.firebaseapp.com",
  projectId: "kurogo-f196b",
  storageBucket: "kurogo-f196b.appspot.com",
  messagingSenderId: "465751261097",
  appId: "1:465751261097:web:222808f7eef91c28bd4eb8",
  measurementId: "G-K43ETW2Q52",
};

firebase.initializeApp(firebaseConfig);
//ここでエラーハンドリング

export const auth = firebase.auth();
