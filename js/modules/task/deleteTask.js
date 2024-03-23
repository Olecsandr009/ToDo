import { deleteTask } from "../../services/tasks/delete.js"
import { getTask } from "./getTask/getTask.js"

const list = document.querySelector("[data-task-list]")

if(list) {
    list.addEventListener("click", async e => {
        e.preventDefault()

        if(e.target.closest("[data-task-del]")) {
            const id = e.target.closest("[data-task-item]").dataset.taskItem

            const status = await deleteTask(id)

            if(status) {
                getTask()
            }
        }
    })
}