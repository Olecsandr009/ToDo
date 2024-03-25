import { getTasks } from "../../../services/tasks/get.js"
import { taskBlock } from "./taskBlock/taskBlcok.js"

const list = document.querySelector("[data-task-list]")

export async function getTask() {
    const tasks = await getTasks()
    let tasksArray = []
    
    if(tasks) {
        tasksArray = []
        list.innerHTML = ""
        tasks.forEach(element => {
            tasksArray.push(element)
        })
        tasksArray.sort((a, b) => new Date(a.data().created.seconds * 1000) - new Date(b.data().created.seconds * 1000))
        tasksArray.forEach(element => {
            list.insertAdjacentHTML("beforeend", taskBlock(element.data(), element.id))
        })
    } else {
        list.innerHTML = ""
    }
}

