export function item(color, background) {
    return `
            <li data-theme-item="${color}" class="theme__item">
                <button tabindex="-1" class="theme__btn" style="background: ${background};"></button>
            </li>
        `
}