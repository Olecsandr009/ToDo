export function taskBlock(task, id) {

    const date = new Date(task.deadline.seconds)

    const currentDate = date.toString()

    // const date = new Date(task.deadline.seconds * 1000).toUTCString()

    return `
        <div data-task-item="${id}" class="content__block">
            <button data-task-del class="content__block-close">&#x2716;</button>

            <div class="content__flags">
                ${task.complete?`<span class="complete"></span>`:""}
            </div>

            <h3 class="content__block-title">${task.title}</h3>
            <p class="content__block-text">${task.text}</p>
            <p class="content__block-deadline">12:12:1222</p>
            <button data-task-complete class="content__block-complete-btn send">Complete</button>
        </div>
    `
}