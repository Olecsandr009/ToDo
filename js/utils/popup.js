const popups = document.querySelectorAll("[data-popup]")
const popupLinks = document.querySelectorAll("[data-popup-link]")

let currentLink;

if(popupLinks.length) {
    popupLinks.forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault()
            allClose(popups, currentLink)

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
    popup.classList.remove("active")
    currentLink.classList.remove("active")
}

function allClose(popups, link) {
    if(popups.length) {
        popups.forEach(element => {
            element.classList.remove("active")

            clearInputs(element)

            if(link) link.classList.remove("active")
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