import { isNotEmpty } from "./functions/isNotEmpty.js";
import { isValidTextArea } from "./functions/isValidTextArea.js";
import { useWarning, getWarning } from "../warning.js";

export function onTextArea(text, element) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    let isError = false;

    if(!isNotEmpty(text)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(element, isError)
    }
        
    if(!isValidTextArea(text)) {
        getWarning(currentElement, "text")
        isError = true
        return useWarning(element, isError)
    }

    return useWarning(element, isError)
}