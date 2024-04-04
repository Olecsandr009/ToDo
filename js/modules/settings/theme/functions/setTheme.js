import { searchThemeByName } from "./searchTheme.js"
import { colors } from "../../../../assets/theme.js"

const root = document.documentElement

export function setTheme(themeName) {
    const currentTheme = searchThemeByName(themeName, colors)

    for(let item in currentTheme.theme) {
        root.style.setProperty(item, currentTheme.theme[item])
    }
}