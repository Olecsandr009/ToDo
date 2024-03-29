import {doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getUser } from "../auth/profile.js"
import { db } from "../../assets/firebaseConf.js"

export async function updateTask(id, data) {
    try {
        const user = getUser()

        if(user) {
            const taskRef = doc(db, "tasks", id)
            
            await updateDoc(taskRef, {...data})
            return true
        }

        return false
    } catch(error) {
        console.log(error.message)
        return false
    }
}