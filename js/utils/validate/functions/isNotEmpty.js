export function isNotEmpty(text) {
    if(!text) return
    const deleteSpaces = text.toString().trim()
    
    if(deleteSpaces.length < 1) return false
    return true
}