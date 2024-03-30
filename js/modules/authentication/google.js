import { authGoogle } from "../../services/auth/google.js"
import { useProfile } from "../profile/profile.js"
import { allClose } from "../../utils/popup.js"
import { closeBurgers } from "../../utils/burger.js"

const google = document.querySelectorAll("[data-login-google]")

google.forEach(element => {
    element.addEventListener("click", async e => {
        try {
            e.preventDefault()
        
            const result = await authGoogle()

            if(result) allClose()
            if(result) closeBurgers()

            useProfile()
        } catch(error) {
            console.log(error)
        }
    })
})