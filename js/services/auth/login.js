import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'

const auth = getAuth()

// createUserWithEmailAndPassword(auth, "sasha2005vit@gmail.com", "bibaboba1234")
//     .then(userCredentials => {
//         const user = userCredentials.user
//         console.log(user)
//     }).catch(error => {
//         console.log(error)
//     })


// signInWithEmailAndPassword(auth, "sasha2005vit@gmail.com", "bibaboba1234")
//     .then(userCredentials => {
//         const user = userCredentials.user
//         console.log(user)
//     }).catch(error => {
//         console.log(error.code, error.message)
//     })