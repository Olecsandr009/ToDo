import { selectThemeAndItem } from "./selectTheme.js";

export function allThemeItemClose(themeElement) {
    if(!themeElement && !themeElement.children.length) return false

    const itemsObject = themeElement.children

    for(let i = 0; i < itemsObject.length; i++) {
        itemsObject[i].classList.remove("active")
    }
}


export function disabledButtons(closeButton, saveButton) {
    if(!closeButton && !saveButton) return

    closeButton.disabled = true;
    saveButton.disabled = true;
}

export function removeThemeAndItem(settings, themeElement) {
    settings.theme = "red";
    selectThemeAndItem(settings.theme, themeElement)
}