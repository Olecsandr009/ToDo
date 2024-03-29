import {addDoc, collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getUser } from "../auth/profile.js"
import { db } from "../../assets/firebaseConf.js"
import { settingExists } from "./functions/settingExists.js"

export async function setSettings(data) {
    try {
        const user = await getUser()
        const settings = await settingExists(user?user.uid: " ")
        
        if(user && !settings) {
            data.userId = user.uid
            await addDoc(collection(db, "settings"), data)
            return true
        }

        return false
    } catch(error) {
        console.log(error.message)
        return false
    }
}