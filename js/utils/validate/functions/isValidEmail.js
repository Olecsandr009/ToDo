export function isValidEmail(text) {
    if(!text) return false
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const deleteSpaces = text.toString().trim()

    if(!regex.test(deleteSpaces)) return false

    return true
}