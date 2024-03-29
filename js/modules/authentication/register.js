import { register } from "../../services/auth/register.js"
import { authError } from "../../assets/auth.js"
import { closeBurgers } from "../../utils/burger.js"
import { allClose } from "../../utils/popup.js"
import { usePlaceholder } from "../../utils/placeholder.js"

import { onEmail, onPassword, onRepeat, onText } from "../../utils/validate/validate.js"

const name = document.querySelector("[data-reg-name]")
const firstName = document.querySelector("[data-reg-first]")
const email = document.querySelector("[data-reg-email]")
const password = document.querySelector("[data-reg-pass]")
const repeat = document.querySelector("[data-reg-repeat]")

const submit = document.querySelector("[data-reg-submit]")

const data = {
    name: "",
    firstName: "",
    email: "",
    password: "",
    repeat: ""
}

if(submit) {
    submit.addEventListener("click", async e => {
        e.preventDefault()

        if(name) data.name = name.querySelector("input").value
        if(firstName) data.firstName = firstName.querySelector("input").value
        if(email) data.email = email.querySelector("input").value
        if(password) data.password = password.querySelector("input").value
        if(repeat) data.repeat = repeat.querySelector("input").value

        onText(data.name, name)
        onText(data.firstName, firstName)
        onEmail(data.email, email)
        onPassword(data.password, password)
        onRepeat(data.password, data.repeat, repeat)

        if(
            onText(data.name, name) &&
            onText(data.firstName, firstName) &&
            onEmail(data.email, email) &&
            onPassword(data.password, password) &&
            onRepeat(data.password, data.repeat, repeat)
        ) {

            const {status, errorCode} = await register(data)

            if(!status && errorCode == authError["emailAlready"]) {
                email.classList.add("warning")
                onError(email, "emailAlready")
            } else if(status && !errorCode) {
                closeBurgers()
                allClose()

                name.querySelector("input").value = ""
                firstName.querySelector('input').value = ""
                email.querySelector("input").value = ""
                password.querySelector("input").value = ""
                repeat.querySelector("input").value = ""

                usePlaceholder()
            }
        }
 
    })
}

lookInput(name.querySelector("input"))
lookInput(firstName.querySelector("input"))
lookInput(email.querySelector("input"))
lookInput(password.querySelector("input"))
lookInput(repeat.querySelector("input"))

function lookInput(input) {
    if(input) {
        input.addEventListener("input", e => {
            input.parentElement.classList.remove("warning")
        })
    }
}