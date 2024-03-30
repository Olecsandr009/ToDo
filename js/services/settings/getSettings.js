import {getAuth} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {query, collection, where, getDocs} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { getUser } from '../auth/profile.js'
import { db } from '../../assets/firebaseConf.js'

export async function getSettings() {
    try {
        const user = await getUser()
        let settings = undefined

        if(user) {
            const q = query(collection(db, "settings"), where("userId", "==", user.uid.toString()))
            const settingsArray = await getDocs(q)

            if(settingsArray) {
                settingsArray.forEach(element => {
                    settings = {...element.data(), id: element.id}
                    console.log(settings)
                })
            }
        }

        return settings

    } catch(error) {
        console.log(error)
        return undefined
    }
}