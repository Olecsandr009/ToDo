import { onEmail, onError, onText } from "../../utils/validate/validate.js"
import { usePlaceholder } from "../../utils/placeholder.js"
import { closeBurgers } from "../../utils/burger.js"
import { allClose } from "../../utils/popup.js"

import { login } from "../../services/auth/login.js"
import { authError } from "../../assets/auth.js"
import { useProfile } from "../profile/profile.js"

const elements = {
    email: document.querySelector("[data-login-email]"),
    password: document.querySelector("[data-login-pass]"),
}

const submit = document.querySelector("[data-login-submit]")

let data = {
    email: "", 
    password: ""
}

if(submit) submit.addEventListener("click", async e => {
    e.preventDefault()

    data = getDataInputs(data, elements)

    if(isValidFunc(elements)) {
        const {status, errorCode} = await login(data.email, data.password)

        if(status && !errorCode) {
            closeBurgers()
            allClose()

            clearDataInputs(elements)

            usePlaceholder()
            useProfile()

        } else if(!status && errorCode == authError["invalidCredential"]) {
            elements.password.classList.add("warning")
            onError(elements.password, "invalidCredential")
        } else if(!status && errorCode == authError["userDisabled"]) {
            elements.email.classList.add("warning")
            onError(elements.email, "userDisabled")
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
        case elements.email:
            return onEmail(data.email, element);
        case elements.password:
            return onText(data.password, element);
        default:
            return false
    }
}