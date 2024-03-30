import { getTasks } from "../../../services/tasks/get.js"
import { taskBlock } from "./taskBlock/taskBlcok.js"

const list = document.querySelector("[data-task-list]")

export async function getTask() {
    if(!list) return

    const tasks = await getTasks()
    if(!tasks) return list.innerHTML = ""

    const tasksArray = []
    list.innerHTML = ""
    
    tasks.forEach(element => {
        tasksArray.push(element)
    })


    tasksArray.sort((a, b) => new Date(a.data().created.seconds * 1000) - new Date(b.data().created.seconds * 1000))

    tasksArray.forEach(element => {
        const elementData = element.data()
        const elementId = element.id
        
        list.insertAdjacentHTML("beforeend", taskBlock(elementData, elementId))
    })
}

