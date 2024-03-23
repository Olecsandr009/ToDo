import {getDocs, query, collection, where} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { db } from "../../assets/firebaseConf.js"
import { getUser } from "../auth/profile.js"

export async function getTasks() {
    try {
        const user = await getUser()
        let tasks = null

        if(user) {
            const q = query(collection(db, "tasks"), where("userId", "==", user.uid.toString()))
            tasks = await getDocs(q)
        }

        return tasks
    } catch(e) {
        console.log(e)
    }
}