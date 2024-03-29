import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { db } from "../../assets/firebaseConf.js"
import { getSettings } from "./getSettings.js"

export async function updateSettings(data) {
    try {
        const settings = await getSettings()

        if(settings) {
            const taskRef = doc(db, "settings", settings.id)
            
            await updateDoc(taskRef, {
                ...data
            })
        }

        return true
    } catch(error) {
        console.log(error.message)
        return false
    }
}