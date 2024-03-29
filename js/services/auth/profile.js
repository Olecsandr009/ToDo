import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {doc, getDoc} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'

export async function getUser() {
    return new Promise((resolve, reject) => {
        const auth = getAuth()
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe()
            resolve(user || null)
        }, reject)
    })
}

export async function getUserData() {
    try {
        const user = await getUser()
        
        if(user) {
            const docRef = doc(db, "users", user.uid)
            const userData = await getDoc(docRef)
            console.log(userData, "user Data result")
            if(userData) return userData
        }
        
        return undefined
    } catch(error) {
        console.log(error.message)
        return undefined
    }
}