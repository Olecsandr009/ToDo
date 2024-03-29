export function isValidDeadLine(date) {
    const currentDate = new Date()

    if(currentDate > date) return false

    return true;
}