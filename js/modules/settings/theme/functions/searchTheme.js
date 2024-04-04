export function searchItemByThemeName(themeName, itemsList) {
    let currentItem

    for(let i = 0; i < itemsList.length; i++) {
        if(itemsList[i].dataset.themeItem == themeName)
            currentItem = itemsList[i]
    }

    return currentItem
}

export function searchThemeByName(themeName, themeArray) {
    let currentTheme = undefined

    themeArray.forEach(element => {
        if(element.name == themeName.toString()) {
            currentTheme = element
        }
    })
    
    return currentTheme
}

export function searchCurrentThemeName(themeElement) {
    if(!themeElement) return false
    
    const currentThemeItem = themeElement.querySelector("[data-theme-item].active")
    const newThemeName = currentThemeItem.dataset.themeItem

    if(newThemeName) return newThemeName
    else return undefined
}