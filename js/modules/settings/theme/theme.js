import {item} from "./item/item.js"
import { colors } from "../../../assets/theme.js"
import { getSettings } from "../../../services/settings/getSettings.js"
import { updateSettings } from "../../../services/settings/updateSettings.js"

const theme = document.querySelector("[data-theme]")
const root = document.documentElement

const close = document.querySelector("[data-theme-close]")
const save = document.querySelector("[data-theme-save]")

let settings = {
    theme: "red"
}

document.addEventListener("DOMContentLoaded", async e => {
    try {
        colorList(colors)
        
        selectTheme(colors)
    } catch(e) {
        console.log(e)
    }
})

export async function selectTheme() {
    try {

        const {setting, id} = await getSettings()
        allClose(theme.children)
        
        if(setting) {
            settings = setting
            const currentTheme = searchThemeByName(settings.theme, colors)
            const currentItem = searchCurrentItem(currentTheme.theme["--color-secondary"])
            setTheme(colors, currentTheme.theme["--color-secondary"])
            if(currentItem) currentItem.classList.add("active")
        } else {
    
        setTheme(colors, colors[0].theme["--color-secondary"])
        document.querySelectorAll("[data-theme-item]")[0].classList.add("active")
        
    } 
    }catch(error) {
        console.log(error.message)
}

}

theme.addEventListener("click", e => {
    e.preventDefault()

    allClose(theme.children)
    
    if(e.target.closest("[data-theme-item]")) {
        const colorItem = e.target.closest("[data-theme-item]")
        const color = colorItem.dataset.themeItem

        colorItem.classList.add("active")

        setTheme(colors, color)
        
        
       onDisabled()
        
    }
})

function onDisabled() {
    const currentThemeItem = theme.querySelector("[data-theme-item].active")
    const currentTheme = searchTheme(colors, currentThemeItem.dataset.themeItem)


        if(currentTheme && currentTheme.name != settings.theme) {
            if(close) close.disabled = false
            if(save) save.disabled = false
        } else {
            if(close) close.disabled = true
            if(save) save.disabled = true
        }
}

if(close) {
    close.addEventListener("click",async e => {
        e.preventDefault()
        try {
            await selectTheme()
            onDisabled()
        } catch(error) {
            console.log(error.message)
        }
    })
}

if(save) {
    save.addEventListener("click", async e => {
        e.preventDefault()
        try {
            const currentThemeItem = theme.querySelector("[data-theme-item].active")
            const currentTheme = searchTheme(colors, currentThemeItem.dataset.themeItem)

            if(currentTheme && currentThemeItem) {
                await updateSettings({
                    theme: currentTheme.name
                })

                await selectTheme()
                onDisabled()
            }
        } catch(error) {
            console.log(error.message)
        }
    })
}

function colorList(colors) {
    theme.innerHTML = ""

    if(colors && colors.length) {
        colors.forEach(color => {
            theme.insertAdjacentHTML("beforeend", item(color.theme["--color-secondary"], color.ava))
        })
    }
}

function setTheme(object, color) {
    const currentTheme = searchTheme(object, color)

    if(currentTheme) {
        for(let item in currentTheme.theme) {
            root.style.setProperty(item, currentTheme.theme[item])
        }
    }
}

function searchTheme(array, color) {
    let currentTheme = undefined

    if(array.length) {
        array.forEach(element => {
            for(const item in element.theme) {
                if(element.theme[item] == color.toString()) {
                    currentTheme = element
                }
            }
        })
    }

    return currentTheme
}

function searchThemeByName(name, array) {
    let currentTheme = undefined

    if(array.length) {
        array.forEach(element => {
            if(element.name == name.toString()) {
                currentTheme = element
            }
        })
    }
    
    return currentTheme
}

function searchCurrentItem(color) {
    const items = document.querySelectorAll("[data-theme-item]")
    let currentItem = undefined

    if(items.length) {
        items.forEach(element => {
            if(element.dataset.themeItem == color.toString()) {
                currentItem = element
            }
        })
    }

    return currentItem
}

function allClose(object) {
    if(object.length) {
        for(let i = 0; i < object.length; i++) {
            object[i].classList.remove("active")
        }
    }
}