import { authGoogle } from "../../services/auth/google.js"
import { getUserGoogle } from "../profile/profile.js"

const google = document.querySelectorAll("[data-login-google]")

if(google.length) {
    google.forEach(element => {

        element.addEventListener("click", e => {
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
    })
}