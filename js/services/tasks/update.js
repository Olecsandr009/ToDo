import {doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { db } from "../../assets/firebaseConf.js"

export async function updateTask(id) {
    try {
        const taskRef = doc(db, "tasks", id)
        
        await updateDoc(taskRef, {
            complete: true
        })

        return true
    } catch(e) {
        console.log(e)
    }
}