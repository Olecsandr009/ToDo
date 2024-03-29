import {getAuth, signInWithPopup, GoogleAuthProvider} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {setDoc, doc, collection} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'
import { setSettings } from '../settings/setSettings.js'
import { emailExists } from './functions/emailExists.js'

export async function authGoogle() {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()

        const result = await signInWithPopup(auth, provider)
        const user = result.user;

        const name = getName(user.displayName)

        if(!await emailExists(user.email)) {
            const usersRef = collection(db, "users")
            await setDoc(doc(usersRef, user.uid), {
                uid: user.uid,
                created: new Date(),
                firstName: name[1],
                name: name[0],
                telegramId: " ",
                email: user.email,
                ava: user.photoURL
            })
        }

        await setSettings({theme: "red"})

        return true
    } catch(error) {
        console.log(error.message)
        return false;
    }
}

function getName(string) {
    const name = string.toString().trim()
    if(name.split(" ").indexOf(" ") == -1) {
        return name.split(" ")
    } else {
        return [name, " "]
    }
}