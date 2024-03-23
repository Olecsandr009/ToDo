import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

export async function getUser() {
    return new Promise((resolve, reject) => {
        const auth = getAuth()
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe()
            resolve(user || null)
        }, reject)
    })
}