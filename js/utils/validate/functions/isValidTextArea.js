export function isValidTextArea(text) {
    if(!text) return false;
    const deleteSpaces = text.toString().trim()
    const regex = /^[\s\S]{1,200}$/

    if(!regex.test(deleteSpaces)) return false

    return true
}