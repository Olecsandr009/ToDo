import { alerts } from "../../assets/alerts.js"
import { updateTask } from "../../services/tasks/update.js"
import { openAlert } from "../../utils/alert.js"
import { getTask } from "./getTask/getTask.js"

const list = document.querySelector("[data-task-list]")

if(list) {
    list.addEventListener('click', async e => {
        if(e.target.closest("[data-task-complete")) {
            const id = e.target.closest("[data-task-item]").dataset.taskItem

            const status = await updateTask(id)

            if(status) {
                getTask()
                openAlert(alerts['complete'])
            }
        }
    })
}