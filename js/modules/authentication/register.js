import { onEmail, onError, onPassword, onRepeat, onText } from "../../utils/validate.js"
import { register } from "../../services/auth/register.js"
import { authError } from "../../assets/auth.js"
import { closeBurgers } from "../../utils/burger.js"
import { allClose } from "../../utils/popup.js"
import { usePlaceholder } from "../../utils/placeholder.js"

const name = document.querySelector("[data-reg-name]")
const firstName = document.querySelector("[data-reg-first]")
const email = document.querySelector("[data-reg-email]")
const password = document.querySelector("[data-reg-pass]")
const repeat = document.querySelector("[data-reg-repeat]")

const submit = document.querySelector("[data-reg-submit]")

if(submit) {
    submit.addEventListener("click", async e => {
        e.preventDefault()

        let nameValue = ""
        let firstValue = ""
        let emailValue = ""
        let passwordValue = ""
        let repeatValue = ""

        if(name) nameValue = name.querySelector("input").value
        if(firstName) firstValue = firstName.querySelector("input").value
        if(email) emailValue = email.querySelector("input").value
        if(password) passwordValue = password.querySelector("input").value
        if(repeat) repeatValue = repeat.querySelector("input").value

        if(!onText(nameValue, name)) name.classList.add("warning")
        else name.classList.remove("warning")

        if(!onText(firstValue, firstName)) firstName.classList.add("warning")
        else firstName.classList.remove("warning")

        if(!onEmail(emailValue, email)) email.classList.add("warning")
        else email.classList.remove("warning")

        if(!onPassword(passwordValue, password)) password.classList.add("warning")
        else password.classList.remove("warning")

        if(!onRepeat(passwordValue, repeatValue, repeat)) repeat.classList.add("warning")
        else repeat.classList.remove("warning")

        if(
            onText(nameValue, name) &&
            onText(firstValue, firstName) &&
            onEmail(emailValue, email) &&
            onPassword(passwordValue, password) &&
            onRepeat(passwordValue, repeatValue, repeat)
        ) {

            const {status, errorCode} = await register(emailValue, passwordValue, nameValue, firstValue)

            if(!status && errorCode == authError["emailAlready"]) {
                email.classList.add("warning")
                onError(email, "emailAlready")
            } else {
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