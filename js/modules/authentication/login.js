import { authError } from "../../assets/auth.js"
import { login } from "../../services/auth/login.js"
import { closeBurgers } from "../../utils/burger.js"
import { usePlaceholder } from "../../utils/placeholder.js"
import { allClose } from "../../utils/popup.js"

import { onEmail, onError, onText } from "../../utils/validate/validate.js"

const email = document.querySelector("[data-login-email]")
const password = document.querySelector("[data-login-pass]")
const submit = document.querySelector("[data-login-submit]")

const loginData = {email: "", password: ""}

if(submit) submit.addEventListener("click", async e => {
    e.preventDefault()

    // Отримуємо дані input
    if(email) loginData.email = getInputValue(email)
    if(password) loginData.password = getInputValue(password)

    onEmail(loginData.email, email)
    onText(loginData.password, password)

    if(onEmail(loginData.email, email) && onText(loginData.password, password)) {

        const {status, errorCode} = await login(loginData.email, loginData.password)

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

lookInput(email.querySelector("input"))
lookInput(password.querySelector("input"))

function getInputValue(element) {
    if(element) return element.querySelector("input").value
}

function lookInput(input) {
    if(input) {
        input.addEventListener("input", e => {
            input.parentElement.classList.remove("warning")
        })
    }
}