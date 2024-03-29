import {addDoc, collection} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { db } from "../../assets/firebaseConf.js"
import { getUser } from "../auth/profile.js"

export async function setTask(data) {
    try {
        const user = await getUser()

        if(user) {
            data.userId = user.uid
            await addDoc(collection(db, "tasks"), data)
            return true
        }

        return false
    } catch(error) {
        console.log(error.message)
        return false
    }
}

