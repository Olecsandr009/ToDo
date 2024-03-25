import {getAuth} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import { allClose } from '../../utils/popup.js'
import {getTask} from "../task/getTask/getTask.js"

const noAuth = document.querySelector("[data-no-auth]")
const isAuth = document.querySelector("[data-auth]")

document.addEventListener("DOMContentLoaded", e => {
    getUserGoogle()
})

const options = {
    popupClose: false
}

export function getUserGoogle(option = options) {
    const auth = getAuth()
    auth.onAuthStateChanged(user => {
        authHandler(user)
        getTask()

        if(user && option.popupClose) {
            allClose()
        }
    })
}

function authHandler(user) {
     if(user) {
        noAuth.classList.remove("no-auth")
        isAuth.classList.add("active")

        getAva(user)
    } else {
        isAuth.classList.remove("active")
        noAuth.classList.add("no-auth")
    }
}

function getAva(user) {
    const image = isAuth.querySelector("img")

    if(image) image.src = user.photoURL  
}