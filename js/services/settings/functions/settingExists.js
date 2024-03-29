import {collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import {db} from "../../../assets/firebaseConf.js"

export async function settingExists(id) {
    try {
        const q = query(collection(db, "settings"), where("userId", "==", id))
        const settings = await getDocs(q)
        let status = false

        if(settings) settings.forEach(() => status = true)

        return status
    } catch(error) {
        console.log(error.message)
        return false
    }
}