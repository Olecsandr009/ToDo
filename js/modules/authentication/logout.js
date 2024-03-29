import { alerts } from "../../assets/alerts.js"
import { popups } from "../../assets/popups.js"
import { googleSingOut } from "../../services/auth/logout.js"
import { openAlert } from "../../utils/alert.js"
import { allClose, openPopup } from "../../utils/popup.js"
import { getUserGoogle } from "../profile/profile.js"
import { closeBurgers } from "../../utils/burger.js"

const logout = document.querySelector("[data-logout]")
const logoutBtn = document.querySelector("[data-logout-buttons]")

if(logout) {
    logout.addEventListener("click", e => {
        e.preventDefault()

        allClose()
        closeBurgers()
        openPopup(popups['logout'])
    })
}

if(logoutBtn) {
    logoutBtn.addEventListener('click', async e => {
        e.preventDefault()
        let status = false

        if(e.target.closest("[data-false]")) {
            status = false
            
            allClose()
            closeBurgers()
        }

        if(e.target.closest("[data-true]")) {
            status = await googleSingOut()
        }

        if(status) {
            allClose()
            closeBurgers()
            openAlert(alerts["logout"])
            getUserGoogle()
        }
    })
}