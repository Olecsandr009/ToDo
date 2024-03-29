export function isValidPassword(text) {
    if(!text) return false
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.,?:'"~!@#$%^&*()_?\-`=+]{8,}$/
    const deleteSpaces = text.toString().trim()

    if(!regex.test(deleteSpaces)) return false
    
    return true
}