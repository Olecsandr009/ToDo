import { isNotEmpty } from "./functions/isNotEmpty.js";
import { isValidTitle } from "./functions/isValidTitle.js";
import { getWarning, useWarning } from "../warning.js";

export function onTitle(text, element) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    let isError = false;

    if(!isNotEmpty(text)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(element, isError)
    }
        
    if(!isValidTitle(text)) {
        getWarning(currentElement, "title")
        isError = true;
        return useWarning(element, isError)
    }

    return useWarning(element, isError)
}