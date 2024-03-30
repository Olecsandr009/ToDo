import { onDeadline, onTextArea, onTitle } from "../../utils/validate/validate.js"
import { closeBurgers } from "../../utils/burger.js"
import { openAlert } from "../../utils/alert.js"
import { allClose } from "../../utils/popup.js"

import { setTask } from "../../services/tasks/create.js"
import { getTask } from "./getTask/getTask.js"
import { alerts } from "../../assets/alerts.js"


const elements = {
    title: document.querySelector("[data-task-title"),
    text: document.querySelector("[data-task-desk]"),
    deadline: document.querySelector("[data-date-input]")
}

const send = document.querySelector("[data-task-send]")

const data = {
    complete: false,
    created: "",
    deadline: new Date(),
    title: "",
    text: "",
    userId: ""
}

if(send) send.addEventListener("click", async e => {
    e.preventDefault()

    getDataInputs(data, elements)

    if(isValidFunc(elements)) {
        data.created = new Date()
        const status = await setTask(data)

        closeBurgers()
        allClose()
        
        if(status) {
            clearDataInputs(elements)
            getTask()
        } else {
            openAlert(alerts["error"])
        }
    }
})

for(const key in elements) lookDataInput(elements[key])

function isValidFunc(elements) {
    const elementsArray = Object.values(elements)
    let isValidState = true;
    for(let i = 0; i < elementsArray.length; i++) {
        if(!isValidValues(elementsArray[i]) && isValidState) isValidState = false;
    }
    return isValidState
}


function getDataInputs(object, elements) {
    const newObject = object
    for(const key in elements) {

        if(key == "deadline") {
            newObject[key] = new Date(getInput(elements[key]).value)
            continue
        }

        const currentInput = getInput(elements[key])
        newObject[key] = elements[key] ? currentInput.value : ""

    }
}

function getInput(element) {
    let currentElement = element.querySelector("input")

    if(!currentElement)
        currentElement = element.querySelector("textarea")

    return currentElement
}

function lookDataInput(element) {
    if(!element) return
    const currentInput = getInput(element)
    if(currentInput) currentInput.addEventListener("input", e => {
        element.classList.remove("warning")
    })
}

function clearDataInputs(elements) {
    for(const key in elements) {
        getInput(elements[key]).value = ""
    }
}

function isValidValues(element) {
    switch(element) {
        case elements.title:
            return onTitle(data.title, element);
        case elements.text:
            return onTextArea(data.text, element);
        case elements.deadline:
            return onDeadline(data.deadline, element);
        default:
            return
    }
}

export function checkDateInput() {
    const dateInput = new Date(elements.deadline.querySelector("input").value)
    if(data.deadline != dateInput) {
        elements.deadline.classList.remove("warning")
    }
}
