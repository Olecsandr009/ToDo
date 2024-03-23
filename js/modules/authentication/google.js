import { authGoogle } from "../../services/auth/google.js"
import { getUserGoogle } from "../profile/profile.js"

const google = document.querySelector("[data-login-google]")

if(google) {
    google.addEventListener("click", e => {
        e.preventDefault()

        try {
            authGoogle()
            getUserGoogle({
                popupClose: true
            })
        } catch(e) {
            console.log(e)
        }
    })
}