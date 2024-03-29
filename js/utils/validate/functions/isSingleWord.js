export function isSingleWord(text) {
    if(!text) return false
    const deleteSpaces = text.toString().trim()

    if(deleteSpaces.split("").indexOf(" ") !== -1) return false

    return true
}