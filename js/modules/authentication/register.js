import { onEmail, onPassword, onText } from "../../utils/validate.js"

const name = document.querySelector("[data-reg-name]")
const firstName = document.querySelector("[data-reg-first]")
const email = document.querySelector("[data-reg-email]")
const password = document.querySelector("[data-reg-pass]")
const repeat = document.querySelector("[data-reg-repeat]")

const submit = document.querySelector("[data-reg-submit]")

if(submit) {
    submit.addEventListener("click", e => {
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

        if(!onText(nameValue)) name.classList.add("warning")
        else name.classList.remove("warning")

        if(!onText(firstValue)) firstName.classList.add("warning")
        else firstName.classList.remove("warning")

        if(!onEmail(emailValue)) email.classList.add("warning")
        else email.classList.remove("warning")

        if(!onPassword(passwordValue)) password.classList.add("warning")
        else password.classList.remove("warning")

        if(passwordValue.toString() != repeatValue.toString()) repeat.classList.add("warning")
        else repeat.classList.remove("warning")

        if(
            onText(nameValue) &&
            onText(firstValue) &&
            onEmail(emailValue) &&
            onPassword(passwordValue) &&
            
            passwordValue.toString() == repeatValue.toString()
        ) {


            
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