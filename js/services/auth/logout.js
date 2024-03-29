import {signOut} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import { getUser } from './profile'

export async function googleSingOut() {
    try {
        const user = await getUser();
        
        if(user) await signOut(auth)

        return true
    } catch(error) {
        console.log(error.message)
        return false
    }
}