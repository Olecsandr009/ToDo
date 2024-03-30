import { deleteTask } from "../../services/tasks/delete.js"
import { getTask } from "./getTask/getTask.js"
import { popups } from "../../assets/popups.js"
import { allClose, openPopup } from "../../utils/popup.js"
import { alerts } from "../../assets/alerts.js"
import { openAlert } from "../../utils/alert.js"

const list = document.querySelector("[data-task-list]")
const delButtons = document.querySelector("[data-delete]")

let currentId

if(list) list.addEventListener("click", async e => {
    e.preventDefault()

    if(e.target.closest("[data-task-del]")) {
        const currentItem = e.target.closest("[data-task-item]")
        currentId = currentItem.dataset.taskItem

        openPopup(popups["delete"])
    }
})

if(delButtons) delButtons.addEventListener("click", async e => {
    e.preventDefault()

    if(e.target.closest("[data-false]")) {
        allClose()
    }

    if(e.target.closest("[data-true]")) {
        
        allClose()

        const status = await deleteTask(currentId)

        if(status) {
            getTask()
            openAlert(alerts["delete"])
        }
    }
})