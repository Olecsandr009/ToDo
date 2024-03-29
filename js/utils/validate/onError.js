import { getWarning, useWarning } from "../warning.js"

export function onError(element, error) {
    if(!element) return false
    const currentElement = element.querySelector("[data-warning]")
    const isError = true

    getWarning(currentElement, error)
    useWarning(element, isError)
}