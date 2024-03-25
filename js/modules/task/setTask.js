import { setTask } from "../../services/tasks/create.js"
import { onDeadline, onTextarea, onTitle } from "../../utils/validate.js"
import { getTask } from "./getTask/getTask.js"
import { allClose } from "../../utils/popup.js"
import { closeBurgers } from "../../utils/burger.js"
import { openAlert } from "../../utils/alert.js"
import { alerts } from "../../assets/alerts.js"

const title = document.querySelector("[data-task-title]")
const desk = document.querySelector("[data-task-desk]")
const date = document.querySelector("[data-date-input]")

const send = document.querySelector("[data-task-send]")

const data = {
    complete: false,
    created: "",
    deadline: new Date(),
    title: "",
    text: "",
    userId: ""
}

if(send) {
    send.addEventListener("click", async e => {
        e.preventDefault()

        if(title) data.title = title.querySelector("input").value
        if(desk) data.text = desk.querySelector("textarea").value

        const deadline = new Date(date.querySelector("input").value)
        if(date) data.deadline = deadline

        if(!onTitle(data.title, title)) title.classList.add("warning")
        else title.classList.remove("warning")

        if(!onTextarea(data.text, desk)) desk.classList.add("warning")
        else desk.classList.remove("warning")

        if(!onDeadline(data.deadline, date)) date.classList.add("warning")
        else date.classList.remove("warning")

        if(onTitle(data.title, title) && 
           onTextarea(data.text, desk) && 
           onDeadline(data.deadline, date)) {
            const status = await setTask(data)
            
            if(status) {
                title.querySelector("input").value = ""
                desk.querySelector("textarea").value = ""
                date.querySelector("input").value = ""

                closeBurgers()
                allClose()
                getTask()
            } else {
                closeBurgers()
                allClose()
                openAlert(alerts["error"])
            }
        }
    })
}

lookInput(title.querySelector("input"))
lookInput(desk.querySelector("textarea"))

function lookInput(input) {
    if(input) {
        input.addEventListener("input", e => {
            input.parentElement.classList.remove("warning")
        })
    }
}

export function checkDateInput() {
    const dateInput = new Date(date.querySelector("input").value)
    if(date.deadline != dateInput) {
        date.classList.remove("warning")
    }
}