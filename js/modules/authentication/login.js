import { authError } from "../../assets/auth.js"
import { login } from "../../services/auth/login.js"
import { closeBurgers } from "../../utils/burger.js"
import { usePlaceholder } from "../../utils/placeholder.js"
import { allClose } from "../../utils/popup.js"
import {onEmail, onError, onPassword} from "../../utils/validate.js"
// import {login} from "../../services/auth/login.js"

const email = document.querySelector("[data-login-email]")
const password = document.querySelector("[data-login-pass]")

const submit = document.querySelector("[data-login-submit]")

if(submit) {
    submit.addEventListener("click", async e => {
        e.preventDefault()

        let emailValue = "";
        let passValue = "";

        if(email) emailValue = email.querySelector("input").value
        if(password) passValue = password.querySelector("input").value

        if(!onEmail(emailValue, email)) email.classList.add("warning")
        else email.classList.remove("warning")

        if(!onPassword(passValue, password, true)) password.classList.add("warning")
        else password.classList.remove("warning")

        if(onEmail(emailValue, email) && onPassword(passValue, password, true)) {

            const {status, errorCode} = await login(emailValue, passValue)

            if(!status && errorCode == authError["invalidCredential"]) {
                password.classList.add("warning")
                onError(password, "invalidCredential")
            } else if(!status && errorCode == authError["userDisabled"]) {
                email.classList.add("warning")
                onError(email, "userDisabled")
            } else {
                closeBurgers()
                allClose()

                email.querySelector("input").value = ""
                password.querySelector("input").value = ""

                usePlaceholder()
            }
        }
    })
}

lookInput(email.querySelector("input"))
lookInput(password.querySelector("input"))

function lookInput(input) {
    if(input) {
        input.addEventListener("input", e => {
            input.parentElement.classList.remove("warning")
        })
    }
}