import {query, collection, where, getDocs} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import {db} from "../../../assets/firebaseConf.js"

export async function emailExists(email) {
    const q = query(collection(db, "users"), where("email", "==", email.toString()))

    const users = []

    const result = await getDocs(q)
    result.forEach(doc => {users.push(doc)})

    if(users.length) return true
    else return false
}