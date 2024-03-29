export function isValidTitle(text) {
    if(!text) return false
    const deleteSpaces = text.toString().trim()
    const regex = /^.{1,20}$/

    if(!regex.test(deleteSpaces)) return false

    return true
}