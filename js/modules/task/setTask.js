import { setTask } from "../../services/tasks/create.js"
import { onTextarea, onTitle } from "../../utils/validate.js"
import { getTask } from "./getTask/getTask.js"

const title = document.querySelector("[data-task-title]")
const desk = document.querySelector("[data-task-desk]")

const send = document.querySelector("[data-task-send]")

const data = {
    complete: false,
    created: new Date(),
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

        if(!onTitle(data.title)) title.classList.add("warning")
        else title.classList.remove("warning")

        if(!onTextarea(data.text)) desk.classList.add("warning")
        else desk.classList.remove("warning")

        if(onTitle(data.title) && onTextarea(data.text)) {
            const status = await setTask(data)
            
            if(status) {
                getTask()
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