import {createUserWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {db} from "../../assets/firebase.js"

export function register(email, password, name, firstName) {
    createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            
            setDoc(doc(db, "users", user.uid), {
                email: email,
                password: password,
                name: name,
                firstName: firstName,
                created: new Date()
            })

            console.log(user)
        }).catch(e => {
            console.log(e.message)
        })
}