import {addDoc, collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getUser } from "../auth/profile.js"
import { db } from "../../assets/firebaseConf.js"

export async function setSettings(data) {
    try {
        const user = await getUser()

        if(user) {
            data.userId = user.uid
            await addDoc(collection(db, "settings"), data)
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error.message)
        return false
    }
}

export async function settingsExists(id) {
    try {
        const q = query(collection(db, "settings"), where("userId", "==", id))
        const settings = await getDocs(q)
        let status = false

        if(settings) {
            settings.forEach(element => {
                status = true
            })
        }

        return status
    } catch(error) {
        console.log(error.message)
        return false
    }
}