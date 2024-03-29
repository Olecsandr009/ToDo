import { onEmail, onError, onPassword, onRepeat, onText } from "../../utils/validate/validate.js"
import { usePlaceholder } from "../../utils/placeholder.js"
import { closeBurgers } from "../../utils/burger.js"
import { allClose } from "../../utils/popup.js"

import { register } from "../../services/auth/register.js"
import { authError } from "../../assets/auth.js"


const elements = {
    name: document.querySelector("[data-reg-name]"),
    firstName: document.querySelector("[data-reg-first]"),
    email: document.querySelector("[data-reg-email]"),
    password: document.querySelector("[data-reg-pass]"),
    repeat: document.querySelector("[data-reg-repeat]")
}

const submit = document.querySelector("[data-reg-submit]")

let data = {
    name: "",
    firstName: "",
    email: "",
    password: "",
    repeat: ""
}

if(submit) submit.addEventListener("click", async e => {
    e.preventDefault()

    data = getDataInputs(data, elements)

    const elementsArray = Object.values(elements)
    const isValid = elementsArray.every(element => isValidValues(element))

    if(isValid) {

        const {status, errorCode} = await register(data)

        if(status && !errorCode) {
            closeBurgers()
            allClose()

            for(const key in elements) clearDataInputs(elements[key])

            usePlaceholder()

        } else if(!status && errorCode == authError["emailAlready"]) {
            elements.email.classList.add("warning")
            onError(elements.email, "emailAlready")
        }
    }

})

for(const key in elements) lookDataInput(elements[key])

function getDataInputs(object, inputsData) {
    const newObject = object;
    for(key in inputsData) {
        newObject[key] = inputsData[key] ? inputsData[key]:""
    }

    return newObject
}

function isValidValues(element) {
    switch(element) {
        case elements.name:
            return onText(data.name, element)
        case elements.firstName:
            return onText(data.firstName, element);
        case elements.email:
            return onEmail(data.email, element);
        case elements.password:
            return onPassword(data.email, element);
        case elements.repeat:
            return onRepeat(data.password, data.repeat, element)
        default:
            return false
    }
}

function clearDataInputs(element) {
    if(element) element.querySelector("input").value = ""
}

function lookDataInput(element) {
    if(!element) return
    const input = element.querySelector("input")
    if(input) input.addEventListener("input", e => {
        element.classList.remove("warning")
    })
}