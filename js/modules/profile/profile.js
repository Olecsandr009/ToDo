import {getAuth} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import { allClose } from '../../utils/popup.js'
import {getTask} from "../task/getTask/getTask.js"
import { getUserData } from '../../services/auth/profile.js'
import { selectTheme } from '../settings/theme/theme.js'

const noAuth = document.querySelector("[data-no-auth]")
const isAuth = document.querySelector("[data-auth]")

const createTask = document.querySelector("[data-create-task]")
const authTask = document.querySelector("[data-auth-task]")

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
        selectTheme()
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

        authTask.classList.remove("active")
        createTask.classList.add("active")

        getAva(user)
    } else {
        isAuth.classList.remove("active")
        noAuth.classList.add("no-auth")

        createTask.classList.remove("active")
        authTask.classList.add("active")
    }
}

function getAva(user) {
    const image = isAuth.querySelector("img")

    if(image && user.photoURL) image.src = user.photoURL
    else image.src = "./images/avatar.png"
}