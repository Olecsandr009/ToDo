import {getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

export async function login(email, password) {
    try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)

        return {status: true, errorCode: undefined}
    } catch(error) {
        console.log(error.message)
        return {status: false, errorCode: error.code}
    }
}