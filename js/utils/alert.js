const alerts = document.querySelectorAll("[data-alert]")

export function openAlert(id) {
    if(alerts.length) {
        alerts.forEach(element => {
            if(element.dataset.alert.toString() == id.toString()) {
                closeAlerts()

                element.classList.add("active")
                const timeoutId = setTimeout(() => {
                    element.dataset.timer = timeoutId
                    element.classList.remove("active")
                    clearTimeout(timeoutId)
                }, 1500)
            }
        })
    }
}

export function closeAlerts() {
    if(alerts.length) {
        alerts.forEach(element => {
            clearTimeout(element.dataset.timer)
            element.classList.remove("active")
        })
    }
}