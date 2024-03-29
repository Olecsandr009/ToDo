import {createUserWithEmailAndPassword, getAuth} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {doc, setDoc} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from '../../assets/firebaseConf.js'
import { emailExists } from "./functions/emailExists.js"

export async function register({data}) {
    try {
        const auth = getAuth()

        const result = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = result.user

        if(!await emailExists(user.email)) {  
            setDoc(doc(db, "users", user.uid), {
                email: data.email,
                password: data.password,
                name: data.name,
                firstName: data.firstName,
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