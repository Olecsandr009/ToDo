export function calculateDays(date) {
    const currentDay = new Date()
    const deadline = new Date(date)

    const differenceDate = deadline.getTime() - currentDay.getTime()

    const result = Math.ceil(differenceDate / (1000 * 60 * 60 * 24))

    return result
}