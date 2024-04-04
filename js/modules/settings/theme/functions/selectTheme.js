import { getSettings } from "../../../../services/settings/getSettings.js";
import { allThemeItemClose, removeThemeAndItem } from "./removeTheme.js";
import { searchItemByThemeName } from "./searchTheme.js";
import { setTheme } from "./setTheme.js";
import { item } from "../item/item.js";
import { settings } from "../settings.js";

const theme = document.querySelector("[data-theme]")

export function selectThemeList(themeColors, themeElement) {
    if(!themeColors.length) return
    themeElement.innerHTML = ""

    themeColors.forEach(color => {
        const themeId = color.name;
        const themeColor = color.ava;

        themeElement.insertAdjacentHTML("beforeend", item(themeId, themeColor))
    })
}

export async function selectThemeDefault() {
    try {
        const userSettings = await getSettings()

        if(userSettings && userSettings.theme) {
            settings.theme = userSettings.theme;
            selectThemeAndItem(userSettings.theme, theme)
        } else {
            removeThemeAndItem(settings, theme)
        }

    } catch(error) {
        console.log(error.message)
    }
}


export function selectThemeAndItem(themeName) {
    const items = theme.children
    const currentItem = searchItemByThemeName(themeName, items)

    allThemeItemClose(theme)

    currentItem.classList.add('active')

    setTheme(themeName)
}

export function onSelectNewTheme(closeElement, saveElement) {
    if(!closeElement && !saveElement) return
    
    closeElement.disabled = false
    saveElement.disabled = false
}