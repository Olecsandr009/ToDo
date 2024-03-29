export function isRepeat(password, repeat) {
    if(!password && !repeat) return false
    const passwordNotSpaces = password.toString().trim();
    const repeatNotSpaces = repeat.toString().trim();

    if(passwordNotSpaces !== repeatNotSpaces) return false

    return true
}