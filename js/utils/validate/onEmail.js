import { isNotEmpty } from "./functions/isNotEmpty.js";
import { isValidEmail } from "./functions/isValidEmail.js";
import { getWarning, useWarning } from "../warning.js";

export function onEmail(text, email) {
    if(!email) return false
    const currentElement = email.querySelector("[data-warning]")
    let isError = false;

    if(!isNotEmpty(text)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(email, isError)
    }

    if(!isValidEmail(text)) {
        getWarning(currentElement, "email")
        isError = true;
        return useWarning(email, isError)
    }

    return useWarning(email, isError)
}