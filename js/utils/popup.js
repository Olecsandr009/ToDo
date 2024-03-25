const popups = document.querySelectorAll("[data-popup]")
const popupLinks = document.querySelectorAll("[data-popup-link]")

let currentLink;

if(popupLinks.length) {
    popupLinks.forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault()
            allClose()

            currentLink = e.currentTarget;

            const popup = currentPopup(currentLink, popups)
            linkHandler(currentLink, popup)
        })
    })
}

if(popups.length) {
    popups.forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault()

            if(e.target.closest("[data-close]")) {
                closePopup(element)
            }

            if(e.target.closest("[data-shadow]")) {
                closePopup(element)
            }
        })
    })
}

export function openPopup(id) {
    let currentPopup;
    let currentLink;

    popups.forEach(element => {
        if(element.dataset.popup.toString() == id.toString())
            currentPopup = element
    })

    popupLinks.forEach(element => {
        if(element.dataset.popupLink.toString() == id.toString())
            currentLink = element
    })

    if(currentPopup) {
        allClose()
        
        if(currentLink)currentLink.classList.add("active")
        currentPopup.classList.add('active')
    }

    return {link: currentLink, popup:  currentPopup}
}

function linkHandler(target, popup) {
    if(popup) {
        target.classList.add("active")
        popup.classList.add("active")
    }
}

// Search popup by data value current link
function currentPopup(target, popups) {
    let popup = undefined

    if(popups.length) {
        popups.forEach(element => {
            if(element.dataset.popup == target.dataset.popupLink) {
                popup = element
            }
        })
    }

    return popup
}

function closePopup(popup) {
    if(popup) {
        popup.classList.remove("active")
        if(currentLink) currentLink.classList.remove("active")
    }
}

export function allClose() {
    if(popups.length) {
        popups.forEach(element => {
            element.classList.remove("active")

            clearInputs(element)

            if(currentLink) currentLink.classList.remove("active")
        })
    }
}

function clearInputs(popup) {
    const inputs = popup.querySelectorAll('input')

    if(inputs) {
        inputs.forEach(element => {
            element.value = ""

            element.parentElement.classList.remove("warning")
        })
    }
}