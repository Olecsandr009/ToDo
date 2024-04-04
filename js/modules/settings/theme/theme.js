import { colors } from "../../../assets/theme.js"
import { updateSettings } from "../../../services/settings/updateSettings.js"
import { openPopup } from "../../../utils/popup.js"
import { popups } from "../../../assets/popups.js"
import { onSelectNewTheme, selectThemeAndItem, selectThemeDefault, selectThemeList } from "./functions/selectTheme.js"
import { allThemeItemClose, disabledButtons, removeThemeAndItem } from "./functions/removeTheme.js"
import { searchCurrentThemeName } from "./functions/searchTheme.js"
import { setTheme } from "./functions/setTheme.js"
import { settings } from "./settings.js"

const theme = document.querySelector("[data-theme]")


const close = document.querySelector("[data-theme-close]")
const save = document.querySelector("[data-theme-save]")

document.addEventListener("DOMContentLoaded", async e => {
        selectThemeList(colors, theme)

        selectThemeDefault()
})

if(theme) theme.addEventListener("click", e => {
    e.preventDefault()

    if(e.target.closest("[data-theme-item]")) {
        const currentThemeItem = e.target.closest("[data-theme-item]")
        const currentThemeName = currentThemeItem.dataset.themeItem

        allThemeItemClose(theme)

        currentThemeItem.classList.add("active")

        setTheme(currentThemeName)

        onSelectNewTheme(close, save)
    }
})

close.addEventListener("click", e => {
    e.preventDefault()

    disabledButtons(close, save)

    selectThemeAndItem(settings.theme, theme)
})

save.addEventListener("click", async e => {
    e.preventDefault()
    const newThemeName = searchCurrentThemeName(theme)
    const result = await updateSettings({theme: newThemeName})

    if(result) settings.theme = newThemeName
    else {
        removeThemeAndItem(settings, theme)

        openPopup(popups["login"])
    }

    disabledButtons(close, save)
})

