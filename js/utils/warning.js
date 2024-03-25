import { warnings } from "../assets/warnings.js";

export function getWarning(element, id) {
    if(element) {
        element.innerText = warnings[id]
    }
}