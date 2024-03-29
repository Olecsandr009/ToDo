import { isNotEmpty } from "./functions/isNotEmpty.js"
import { isRepeat } from "./functions/isRepeat.js";
import { getWarning, useWarning } from "../warning.js";

export function onRepeat(password, repeat, element) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    let isError = false;

    if(!isNotEmpty(repeat)) {
        getWarning(currentElement, "input")
        isError = true;
        return useWarning(element, isError)
    }

    if(!isRepeat(password, repeat)) {
        getWarning(currentElement, "repeatPass")
        isError = true;
        return useWarning(element, isError)
    }
        
    return useWarning(element, isError)
}