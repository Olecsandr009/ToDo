import {doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import {db} from "../../assets/firebaseConf.js"
import { getUser } from "../auth/profile.js"

export async function deleteTask(id) {
    try {
        const user = getUser()

        if(user) {
            await deleteDoc(doc(db, "tasks", id))
            
            return true
        }

        return false
    } catch(error) {
        console.log(error)
        return false
    }
}