import { allClose } from "./popup.js"

const links = document.querySelectorAll("[data-burger-link]")
const burgers = document.querySelectorAll("[data-burger]")

const primary = document.querySelectorAll("[data-primary]")

const oneOpen = document.querySelectorAll("[data-one-open]")

if(links.length) {
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault()

            const currentBurger = searchBurger(link, burgers)

            if(currentBurger) {
                if(
                    link.classList.contains("active") &&
                    link.classList.contains("close-all")
                ) {
                    allClose()
                }

                if(openState(link)) {
                    link.classList.add("active")
                    currentBurger.classList.add("active")
                } else {
                    link.classList.toggle("active")
                    currentBurger.classList.toggle("active")
                }
            }

        })
    })
}

if(burgers.length) {
    burgers.forEach(burger => {
        burger.addEventListener("click", e => {
            e.preventDefault()

            if(e.target.closest("[data-shadow")) {
                closeBurgers()
            }
        })
    })
}

export function closeBurgers() {
    if(links.length) {
        links.forEach(link => {
            if(!checkPrimary(link)) link.classList.remove("active")
        })
    }
    if(burgers.length) {
        burgers.forEach(burger => {
            if(!checkPrimary(burger)) burger.classList.remove("active")
        })
    }
}
    
function checkPrimary(link) {
    let state = false

    if(primary.length) {
        primary.forEach(element => {
            if(element == link) state = true
        })
    }

    return state
}

function searchBurger(currentLink, burgers) {
    let currentBurger = undefined
    if(burgers.length) {
        burgers.forEach(burger => {
            if(
                parseInt(burger.dataset.burger) == 
                parseInt(currentLink.dataset.burgerLink)
            ) {
                currentBurger = burger
            }
        })
    }

    return currentBurger
}

function openState(link) {
    let state = false

    if(oneOpen.length) {
        oneOpen.forEach(element => {
            if(element == link) {
                state = true
            }
        })
    }

    return state
}