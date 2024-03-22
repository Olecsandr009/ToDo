const eye = document.querySelectorAll("[data-eye]")

if(eye.length) {
    eye.forEach(element => {
        element.addEventListener("click", e => {
            e.preventDefault()

            console.log("eye")

            const currentInput = e.currentTarget.parentElement.querySelector("input")

            if(e.target.closest("[data-eye-open]")) {
                const currentEye = e.target.closest("[data-eye-open]")
                openHandler(currentInput, currentEye)
            }

            if(e.target.closest("[data-eye-close]")) {
                const currentEye = e.target.closest("[data-eye-close")
                closeHandler(currentInput, currentEye)
            }
        })
    })
}

function openHandler(input, target) {
    const children = target.parentElement.children
    const closeEye = target.parentElement.querySelector("[data-eye-close]")

    if(children.length) {
        for(let i = 0; i < children.length; i++) {
            children[i].classList.remove("active")
        }
    }

    closeEye.classList.add("active")
    input.type = "text"
}

function closeHandler(input, target) {
    const children = target.parentElement.children
    const openEye = target.parentElement.querySelector("[data-eye-open]")

    if(children.length) {
        for(let i = 0; i < children.length; i++) {
            children[i].classList.remove("active")
        }
    }

    openEye.classList.add("active")
    input.type = "password"
}