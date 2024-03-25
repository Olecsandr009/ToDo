import { deleteTask } from "../../services/tasks/delete.js"
import { getTask } from "./getTask/getTask.js"
import { popups } from "../../assets/popups.js"
import { allClose, openPopup } from "../../utils/popup.js"
import { alerts } from "../../assets/alerts.js"
import { openAlert } from "../../utils/alert.js"


const list = document.querySelector("[data-task-list]")
const delButtons = document.querySelector("[data-delete]")

const confirm = true;

let currentId
let status

if(list) {
    list.addEventListener("click", async e => {
        e.preventDefault()

        if(e.target.closest("[data-task-del]")) {
            currentId = e.target.closest("[data-task-item]").dataset.taskItem
            status = false

            if(!confirm) {
                status = await deleteTask(id)
            } else {
                openPopup(popups["delete"])
            }

            if(status) {
                getTask()
                openAlert(alerts["delete"])
            }
        }
    })
}

if(confirm && delButtons) {
    delButtons.addEventListener("click", async e => {
        e.preventDefault()

        if(e.target.closest("[data-false]")) {
            allClose()
            status = false
        }
        if(e.target.closest("[data-true]")) {
            allClose()
            status = await deleteTask(currentId)

            if(status) {
                getTask()
                openAlert(alerts["delete"])
            }
        }
    })
}