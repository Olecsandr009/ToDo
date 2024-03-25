import {createUserWithEmailAndPassword, getAuth} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {doc, setDoc,  query, collection, where, getDocs} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'

export async function register(email, password, name, firstName) {
    try {
        const auth = getAuth()

        const result = await createUserWithEmailAndPassword(auth, email, password)
        const user = result.user

        if(!await emailExists(user.email)) {  
            setDoc(doc(db, "users", user.uid), {
                email: email,
                password: password,
                name: name,
                firstName: firstName,
                created: new Date(),
                telegramId: " ",
                uid: user.uid,
                ava: 'https://drive.google.com/uc?id=1YTXKeX2JlKKa90naHflvS6_ns8TJ5vRG'
            })
        }

        return {status: true, errorCode: undefined}

    } catch(error) {
        return {status: false, errorCode: error.code}
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