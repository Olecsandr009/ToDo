import { getUserData } from '../../services/auth/profile.js'
import { selectThemeDefault } from '../settings/theme/theme.js'
import { getTask } from "../task/getTask/getTask.js"

const noAuth = document.querySelector("[data-no-auth]")
const isAuth = document.querySelector("[data-auth]")

const createTask = document.querySelector("[data-create-task]")
const authTask = document.querySelector("[data-auth-task]")

document.addEventListener("DOMContentLoaded", e => {
    useProfile()
})

export async function useProfile() {
    try {
        const user = await getUserData()

        if(user) {
            authHandler(user)
            selectThemeDefault()
            getTask()
        }
    } catch(error) {
        console.log(error.message)
    }
}


function authHandler(user) {
     if(user) {
        noAuth.classList.remove("no-auth")
        isAuth.classList.add("active")

        authTask.classList.remove("active")
        createTask.classList.add("active")

        isAuth.querySelector("img").src = user.ava
    } else {
        isAuth.classList.remove("active")
        noAuth.classList.add("no-auth")

        createTask.classList.remove("active")
        authTask.classList.add("active")

        isAuth.querySelector("img").src = ""
    }
}