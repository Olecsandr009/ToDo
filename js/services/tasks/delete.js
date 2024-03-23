import {doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import {db} from "../../assets/firebaseConf.js"

export async function deleteTask(id) {
    try {
        await deleteDoc(doc(db, "tasks", id))

        return true
    } catch(e) {
        console.log(e)
    }
}