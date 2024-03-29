import { warnings } from "../assets/warnings.js";

export function useWarning(element, state) {
    if(!element) return false
    if(state) {
        addWarning(element)
        return false
    }

    removeWarning(element)
    return true
}

export function getWarning(element, id) {
    if(element) element.innerText = warnings[id]
}

function addWarning(element) {
    if(element) element.classList.add("warning")
}

function removeWarning(element) {
    if(element) element.classList.remove("warning")
}