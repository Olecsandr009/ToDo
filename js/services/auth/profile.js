import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {query, collection, where, getDocs} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
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
        let data = undefined

        if(user) {
            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const userData = await getDocs(q)

            if(userData) {
                userData.forEach(element => {
                    data = element.data()
                })
            }

            return data
        } else {
            return undefined
        }
    } catch(error) {
        console.log(error.message)
        return undefined
    }
}