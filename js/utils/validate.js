export function onPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if(password.length <= 0) return false

    if(!regex.test(password)) return false

    return true
}

export function onEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(email.length <= 0) return false

    if(!regex.test(email)) return false

    return true
}

export function onText(text) {
    if(text.length <= 0) return false

    if(text.toString().trim().split("").indexOf(" ") != -1) return false

    return true
}

export function onTitle(text) {
    const regex = /^.{1,20}$/

    if(text.length <= 0) return false

    if(!regex.test(text)) return false

    return true
}

export function onTextarea(text) {
    const regex = /^.{1,200}$/

    if(text.length <= 0) return false

    if(!regex.test(text)) return false

    return true
}