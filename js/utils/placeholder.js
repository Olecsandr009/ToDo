const placeholder = document.querySelectorAll("[data-placeholder]")

if(placeholder.length) {
    placeholder.forEach(element => {
        const currentInput = element.parentElement.querySelector("input");

        currentInput.addEventListener("input", e => {
            if(e.target.value.length > 0) {
                element.classList.add("value")
            } else {
                element.classList.remove("value")
            }
        })
    })
}