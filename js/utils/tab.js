const lists = document.querySelectorAll("[data-tab-list]")
const tabs = document.querySelectorAll("[data-tab]")

let currentLink;

if(lists.length) {
    lists.forEach(element => {
        element.addEventListener("click", e => {
            e.preventDefault();

            if(e.target.closest("[data-tab-link]")) {
                allClose(tabs, currentLink)
                currentLink = e.target.closest("[data-tab-link]")

                const tab = currentTab(currentLink, tabs)
                linkHandler(currentLink, tab)
            }
        })
    })
}

function linkHandler(link, tab) {
    if(tab) {
        link.classList.add("active")
        tab.classList.add("active")
    }
}

// Search tab by data value current link
function currentTab(link, tabs) {
    let tab = undefined

    if(tabs.length) {
        tabs.forEach(element => {
            if(element.dataset.tab == link.dataset.tabLink) {
                tab = element
            }
        })
    }

    return tab
}

function allClose(tabs, link) {
    if(tabs.length) {
        tabs.forEach(element => {
            element.classList.remove('active')

            if(link) link.classList.remove('active')
        })
    }
}