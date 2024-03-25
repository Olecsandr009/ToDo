import {getAuth, signOut} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

export async function googleSingOut() {
    try {
        const auth = getAuth()
        
        if(auth) {
            await signOut(auth)
        }

        return true
    } catch(e) {
        console.log(e)
    }
}