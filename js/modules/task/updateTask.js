import { alerts } from "../../assets/alerts.js"
import { updateTask } from "../../services/tasks/update.js"
import { openAlert } from "../../utils/alert.js"
import { getTask } from "./getTask/getTask.js"

const list = document.querySelector("[data-task-list]")
const data = {complete: true}

if(list) list.addEventListener('click', async e => {
    if(e.target.closest("[data-task-complete")) {
        try {
            const currentTask = e.target.closest("[data-task-item]")
            const currentTaskId = currentTask.dataset.taskItem

            
            const status = await updateTask(currentTaskId, data)
            
            if(status) {
                getTask()
                openAlert(alerts['complete'])
            }
            
        } catch(error) {
            console.log(error.message)
        }
    }
})