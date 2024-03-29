import { isDate } from "./functions/isDate.js";
import { isValidDeadLine } from "./functions/isValidDeadLine.js";
import { useWarning, getWarning } from "../warning.js";

export function onDeadline(date, element) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    let isError = false;

    if(!isDate(date)) {
        getWarning(currentElement, "input")
        isError = true
        return useWarning(element, isError)
    }

    if(!isValidDeadLine(date)) {
        getWarning(currentElement, "date")
        isError = true
        return useWarning(element, isError)
    }

    return useWarning(element, isError)
}