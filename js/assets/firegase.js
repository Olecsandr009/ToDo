import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBIvx_vwRHfgq7zmkS9k-M5o8STmTFoJo8",
    authDomain: "todo-87446.firebaseapp.com",
    projectId: "todo-87446",
    storageBucket: "todo-87446.appspot.com",
    messagingSenderId: "219427598793",
    appId: "1:219427598793:web:180eee61d875f8f3027818",
    measurementId: "G-LHLWSG6BX1"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()