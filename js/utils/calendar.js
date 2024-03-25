import { checkDateInput } from "../modules/task/setTask.js"

const currentDate = document.querySelector("[data-calendar-date]")
const nav = document.querySelector("[data-calendar-nav")

const days = document.querySelector("[data-calendar-days]")
const input = document.querySelector("[data-date-input]")

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()

const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
]

function manipulate() {
    const dayOne = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const dayEnd = new Date(year, month, lastDate).getDay()
    const monthLastDate = new Date(year, month, 0).getDate()

    let lit = ""

    for(let i = dayOne; i > 0; i--) {
        lit += `<li class="aside__calendar-disabled">${monthLastDate - i + 1}</li>`
    }

    for(let i = 1; i <= lastDate; i++) {
        let isToday = i == date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="aside__calendar-day ${isToday}">${i}</li>`
    }

    for(let i = dayEnd; i < 6; i++) {
        lit += `<li class="aside__calendar-disabled">${i - dayEnd + 1}</li>`
    }

    currentDate.innerText = `${months[month]} ${year}`

    days.innerHTML = lit
}

manipulate()

nav.addEventListener("click", e => {
    if(e.target.closest("[data-calendar-prev]")) {
        month -= 1
    }
    if(e.target.closest("[data-calendar-next]")) {
        month += 1
    }

    if(month < 0 || month > 11) {
        date = new Date(year, month, new Date().getDate())
        year = date.getFullYear()
        month = date.getMonth()
    } else {
        date = new Date()
    }

    manipulate()
})

if(days) {
    days.addEventListener("click", e => {
        e.preventDefault()
        const currentInput = input.querySelector("input")
        
        if(e.target.closest("li") && currentInput) {
            const dayValue = e.target.closest("li").innerText

            const currentMonth = month < 10 ? `0${month + 1}` : `${month + 1}`
            const currentDay = dayValue < 10 ? `0${dayValue}` : `${dayValue}`

            currentInput.value = `${year}-${currentMonth}-${currentDay}`
        }

        checkDateInput()

    })
}