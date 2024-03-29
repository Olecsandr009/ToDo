import { isNotEmpty } from "./functions/isNotEmpty.js"
import { isValidPassword } from "./functions/isValidPassword.js";
import { useWarning, getWarning } from "../warning.js";

export function onPassword(text, password) {
    if(!password) return false
    const currentElement = password.querySelector("[data-warning]")
    let isError = false;
    
    if(!isNotEmpty(text)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(password, isError)
    }
    
    if(!isValidPassword(text)) {
        getWarning(currentElement, "password")
        isError = true;
        return useWarning(password, isError)
    }

    return useWarning(password, isError)
}