import {getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult} from 'firebase/auth'

const provider = new GoogleAuthProvider()
const auth = getAuth()

export function authGoogle() {
    signInWithPopup(auth, provider)
        .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken;
            
            const user = result.user
            console.log(user)
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            const email = error.customData.email
            
            const credential = GoogleAuthProvider.credentialFromError(error)
        })
}