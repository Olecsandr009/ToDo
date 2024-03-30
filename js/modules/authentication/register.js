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

    if(isValidFunc(elements)) {

        const {status, errorCode} = await register(data)

        if(status && !errorCode) {
            closeBurgers()
            allClose()

            clearDataInputs()

            usePlaceholder()

        } else if(!status && errorCode == authError["emailAlready"]) {
            elements.email.classList.add("warning")
            onError(elements.email, "emailAlready")
        }
    }

})

for(const key in elements) lookDataInput(elements[key])

function isValidFunc(elements) {
    const elementsArray = Object.values(elements)
    let isValidState = true;
    for(let i = 0; i < elementsArray.length; i++) {
        if(!isValidValues(elementsArray[i]) && isValidState) isValidState = false;
    }
    return isValidState
}

function getInput(element) {
    return element.querySelector("input")
}

function getDataInputs(object, elements) {
    const newObject = object;
    for(const key in elements) {
        newObject[key] = elements[key] ? getInput(elements[key]).value : ""
    }

    return newObject
}

function lookDataInput(element) {
    if(!element) return
    getInput(element).addEventListener("input", e => {
        element.classList.remove("warning")
    })
}

function clearDataInputs(elements) {
    for(const key in elements) {
        getInput(elements[key]).value = ""
    }
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
            return onPassword(data.password, element);
        case elements.repeat:
            return onRepeat(data.password, data.repeat, element)
        default:
            return false
    }
}