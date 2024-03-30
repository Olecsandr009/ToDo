import { calculateDays } from "../../../../utils/calculateDays.js"

export function taskBlock(task, id) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const timestamp = task.deadline.seconds * 1000
    const deadline = new Date(timestamp).toString().split(" ")

    const year = deadline[3]
    const day = deadline[2]

    const validDeadline = day + ":" + (months.indexOf(deadline[1]) + 1) + ":" + year

    const dayLength = calculateDays(new Date(timestamp))

    return `
        <div data-task-item="${id}" class="content__block">
            <button data-task-del class="content__block-close">&#x2716;</button>

            <div class="content__flags">
                ${task.complete?`<span class="complete">Виконане</span>`:""}
                ${dayLength < 6? `<span class="term">Термінове</span>`:""}
            </div>

            <h3 class="content__block-title">${task.title}</h3>
            <p class="content__block-text">${task.text}</p>
            <p class="content__block-deadline">${validDeadline}</p>
            <button ${task.complete?"data-task-del":"data-task-complete"} class="content__block-complete-btn send">
                ${task.complete?"Видалити":"Виконати"}
            </button>
        </div>
    `
}