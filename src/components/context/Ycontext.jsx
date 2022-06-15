import { createContext, useState } from "react";
import { createTheme } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const Ycontext = createContext({});

export const Yprovider = (props) => {
  const { children } = props;

  const Background = createTheme({
    type: "dark",
    theme: {
      colors: {
        primaryLight: "$green200",
        primary: "#4ADE7B",
        primaryDark: "$green600",
        gradient:
          "linear-gradient(112deg, $blue100 -35%, $pink500 -20%, $purple500 80%)",
        link: "#5E1DAD",
        myColor: "#ff4ecd",
      },
      space: {},
      fonts: {},
    },
  });
  const firebaseConfig = {
    apiKey: "AIzaSyBHpuVknGk-I6cU07t9eKTkPYAKA6SYqHg",
    authDomain: "kurogo-f196b.firebaseapp.com",
    projectId: "kurogo-f196b",
    storageBucket: "kurogo-f196b.appspot.com",
    messagingSenderId: "465751261097",
    appId: "1:465751261097:web:222808f7eef91c28bd4eb8",
    measurementId: "G-K43ETW2Q52",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  return (
    <Ycontext.Provider value={{ Background, db, storage }}>
      {children}
    </Ycontext.Provider>
  );
};
