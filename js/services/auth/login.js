import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'

export async function login(email, password) {
    try {
        const auth = getAuth()

        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user;

        return {status: true, errorCode: undefined}
    } catch(error) {
        return {status: false, errorCode: error.code}
    }
}