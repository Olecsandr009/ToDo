import { json } from "../../../utils/json.js"
import {item} from "./item/item.js"

const theme = document.querySelector("[data-theme]")
const root = document.documentElement

let colors

document.addEventListener("DOMContentLoaded", async e => {
    colors = await json("../../../json/colors.json")

    colorList(colors)

    setTheme(colors, colors[0]["--color-secondary"])
    document.querySelectorAll("[data-theme-item]")[0].classList.add("active")
})

theme.addEventListener("click", e => {
    e.preventDefault()

    allClose(theme.children)

    if(e.target.closest("[data-theme-item]")) {
        const colorItem = e.target.closest("[data-theme-item]")
        const color = colorItem.dataset.themeItem

        colorItem.classList.add("active")

        setTheme(colors, color)
    }
})

function colorList(colors) {
    theme.innerHTML = ""

    if(colors.length) {
        colors.forEach(color => {
            theme.insertAdjacentHTML("beforeend", item(color["--color-secondary"]))
        })
    }
}

function setTheme(object, color) {
    const currentTheme = searchTheme(object, color)

    if(currentTheme) {
        for(let item in currentTheme) {
            root.style.setProperty(item, currentTheme[item].toString())
        }
    }
}

function searchTheme(array, color) {
    let currentTheme = undefined

    if(array.length) {
        array.forEach(element => {
            for(const item in element) {
                if(element[item].toString() == color.toString()) {
                    currentTheme = element
                }
            }
        })
    }

    return currentTheme
}

function allClose(object) {
    if(object.length) {
        for(let i = 0; i < object.length; i++) {
            object[i].classList.remove("active")
        }
    }
}