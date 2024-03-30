import { alerts } from "../../assets/alerts.js"
import { popups } from "../../assets/popups.js"
import { googleSingOut } from "../../services/auth/logout.js"
import { openAlert } from "../../utils/alert.js"
import { allClose, openPopup } from "../../utils/popup.js"
import { useProfile } from "../profile/profile.js"
import { closeBurgers } from "../../utils/burger.js"

const logout = document.querySelector("[data-logout]")
const logoutBtn = document.querySelector("[data-logout-buttons]")

if(logout) logout.addEventListener("click", e => {
    e.preventDefault()

    allClose()
    closeBurgers()
    
    openPopup(popups['logout'])
})

if(logoutBtn) logoutBtn.addEventListener('click', async e => {
    try {
        e.preventDefault()

        if(e.target.closest("[data-false]")) {
            allClose()
            closeBurgers()
        }

        if(e.target.closest("[data-true]")) {
            await googleSingOut()
            
            allClose()
            closeBurgers()

            openAlert(alerts["logout"])
            useProfile()
        }

    } catch(error) {
        console.log(error.message)
    }
})