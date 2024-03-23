import { getTasks } from "../../../services/tasks/get.js"
import { taskBlock } from "./taskBlock/taskBlcok.js"

const list = document.querySelector("[data-task-list]")

export async function getTask() {
    const tasks = await getTasks()

    if(tasks) {
        list.innerHTML = ""
        tasks.forEach(element => {
            list.insertAdjacentHTML("beforeend", taskBlock(element.data(), element.id))
        })
    }
}