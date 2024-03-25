import { getWarning } from "./warning.js"

export function onPassword(text, password, login = false) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if(password) {
        const currentElement = password.querySelector("[data-warning]")
        
        if(text.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }
        
        if(!login && !regex.test(text)) {
            getWarning(currentElement, "password")
            return false
        }
    }

    return true
}

export function onRepeat(pass, repeat, element) {
    if(element) {
        const currentElement = element.querySelector("[data-warning]")

        if(repeat.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }

        if(pass.toString() != repeat.toString()) {
            getWarning(currentElement, "repeatPass")
            return false
        }
    }

    return true
}

export function onEmail(text, email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(email) {
        const currentElement = email.querySelector("[data-warning]")

        if(text.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }

        if(!regex.test(text)) {
            getWarning(currentElement, "email")
            return false
        }

    }

    return true
}

export function onText(text, element) {
    if(element) {
        const currentElement = element.querySelector("[data-warning]")

        if(text.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }
        
        if(text.toString().trim().split("").indexOf(" ") != -1) {
            getWarning(currentElement, "space")
            return false
        }
    }

    return true
}

export function onTitle(text, element) {
    const regex = /^.{1,20}$/

    if(element) {
        const currentElement = element.querySelector("[data-warning]")

        if(text.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }
        
        if(!regex.test(text)) {
            getWarning(currentElement, "title")
            return false
        }
    }

    return true
}

export function onTextarea(text, element) {
    const regex = /^.{1,200}$/

    if(element) {
        const currentElement = element.querySelector("[data-warning]")

        if(text.length <= 0) {
            getWarning(currentElement, "input")
            return false
        }
        
        if(!regex.test(text)) {
            getWarning(currentElement, "text")
            return false
        }
    }

    return true
}

export function onDeadline(date, element) {
    const currentDate = new Date()

    if(element) {
        const currentElement = element.querySelector("[data-warning]")
        
        if(isNaN(date)) {
            getWarning(currentElement, "input")
            return false
        }

        if(date < currentDate) {
            getWarning(currentElement, "date")
            return false
        }
    }

    return true
}

export function onError(element, error) {
    if(element) {
        const currentElement = element.querySelector("[data-warning]")

        getWarning(currentElement, error)
    }
}