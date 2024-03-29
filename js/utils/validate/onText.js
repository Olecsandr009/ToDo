import { isNotEmpty } from "./functions/isNotEmpty.js"
import { isSingleWord } from "./functions/isSingleWord.js"
import { getWarning, useWarning } from "../warning.js"

export function onText(text, element) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    let isError = false

    if(!isNotEmpty(text)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(element, isError)
    }
        
    if(!isSingleWord(text)) {
        getWarning(currentElement, "space")
        isError = true;
        return useWarning(element, isError)
    }

    return useWarning(element, isError)
}