import {getAuth, signInWithPopup, GoogleAuthProvider, EmailAuthProvider} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {addDoc, collection, query, getDocs, where} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'
import { setSettings, settingsExists } from '../settings/setSettings.js'

const provider = new GoogleAuthProvider()
const auth = getAuth()

export function authGoogle() {
    signInWithPopup(auth, provider)
        .then(async result => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken;
            
            const user = result.user

            const name = getName(user.displayName)

            if(!await emailExists(user.email)) {                
                const docRef = await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    created: new Date(),
                    firstName: name[1],
                    name: name[0],
                    telegramId: " ",
                    email: user.email,
                    ava: user.photoURL
                })
            }

            if(!await settingsExists(user.uid)) {
                await setSettings({
                    theme: "red"
                })
            }
                
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            const credential = GoogleAuthProvider.credentialFromError(error)

        })
}

function getName(string) {
    const name = string.toString().trim()
    if(name.split(" ").indexOf(" ") == -1) {
        return name.split(" ")
    } else {
        return [name, " "]
    }
}

async function emailExists(email) {
    const q = query(collection(db, "users"), where("email", "==", email.toString()))

    const users = []

    const result = await getDocs(q)
    result.forEach(doc => {
        users.push(doc)
    })

    if(users.length) return true
    else return false
}

