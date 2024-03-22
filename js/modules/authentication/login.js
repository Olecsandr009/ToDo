import {onEmail, onPassword} from "../../utils/validate.js"
// import {login} from "../../services/auth/login.js"

const email = document.querySelector("[data-login-email]")
const password = document.querySelector("[data-login-pass]")

const submit = document.querySelector("[data-login-submit]")

if(submit) {
    submit.addEventListener("click", e => {
        e.preventDefault()

        let emailValue = "";
        let passValue = "";

        if(email) emailValue = email.querySelector("input").value
        if(password) passValue = password.querySelector("input").value

        if(!onEmail(emailValue)) email.classList.add("warning")
        else email.classList.remove("warning")

        if(!onPassword(passValue)) password.classList.add("warning")
        else password.classList.remove("warning")

        if(onEmail(emailValue) && onPassword(passValue)) {
            // login()
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