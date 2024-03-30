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
        selectThemeList(colors)

        selectThemeDefault()
})

function selectThemeList(colors) {
    if(!colors.length) return
    theme.innerHTML = ""

    colors.forEach(color => {
        const themeId = color.name;
        const themeColor = color.ava;

        theme.insertAdjacentHTML("beforeend", item(themeId, themeColor))
    })
}

export async function selectThemeDefault() {
    try {
        const userSettings = await getSettings()

        userSettings && userSettings.theme ?
        (   settings.theme = userSettings.theme,
            selectThemeAndItem(userSettings.theme)
        ):  selectThemeAndItem(settings.theme)

    } catch(error) {
        console.log(error.message)
    }
}

function setTheme(themeName) {
    const currentTheme = searchThemeByName(themeName, colors)

    for(let item in currentTheme.theme) {
        root.style.setProperty(item, currentTheme.theme[item])
    }
}

function selectThemeAndItem(themeName) {
    const items = theme.children
    const currentItem = searchItemByThemeName(themeName, items)

    allThemeItemClose()

    currentItem.classList.add('active')

    setTheme(themeName)
}

function searchThemeByName(name, array) {
    let currentTheme = undefined

    array.forEach(element => {
        if(element.name == name.toString()) {
            currentTheme = element
        }
    })
    
    return currentTheme
}

function searchItemByThemeName(name, items) {
    let currentItem

    for(let i = 0; i < items.length; i++) {
        if(items[i].dataset.themeItem == name)
            currentItem = items[i]
    }

    return currentItem
}

if(theme) theme.addEventListener("click", e => {
    e.preventDefault()

    if(e.target.closest("[data-theme-item]")) {
        const currentThemeItem = e.target.closest("[data-theme-item]")
        const currentThemeName = currentThemeItem.dataset.themeItem

        allThemeItemClose()

        currentThemeItem.classList.add("active")

        setTheme(currentThemeName)

        onSaveNewTheme()
    }
})

function allThemeItemClose() {
    if(!theme && !theme.children.length) return false

    const itemsObject = theme.children

    for(let i = 0; i < itemsObject.length; i++) {
        itemsObject[i].classList.remove("active")
    }
}

function onNewTheme(currentThemeName) {
    if(currentThemeName === settings.theme) return false
    return true
}

function onSaveNewTheme() {
    if(!close && !save) return
    
    close.disabled = false
    save.disabled = false
}

function disabledButtons() {
    if(!close && !save) return

    close.disabled = true;
    save.disabled = true;
}

close.addEventListener("click", e => {
    e.preventDefault()

    disabledButtons()

    selectThemeAndItem(settings.theme)
})

save.addEventListener("click", e => {
    e.preventDefault()

    disabledButtons()

    const newThemeName = getCurrentThemeName()
    
    settings.theme = newThemeName

    updateSettings({theme: newThemeName})
})

function getCurrentThemeName() {
    if(!theme) return false
    
    const currentThemeItem = theme.querySelector("[data-theme-item].active")
    const newThemeName = currentThemeItem.dataset.themeItem

    if(newThemeName) return newThemeName
    else return undefined
}