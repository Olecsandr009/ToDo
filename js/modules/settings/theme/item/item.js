export function item(color) {
    return `
            <li data-theme-item="${color}" class="theme__item">
                <button class="theme__btn" style="background-color: ${color};"></button>
            </li>
        `
}