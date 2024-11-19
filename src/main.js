function getBrowserPreferredTheme() {
    if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark"
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light"
        }
    }
}

function getPreferredTheme() {
    return window.localStorage.getItem("theme") ?? getBrowserPreferredTheme() ?? "dark"
}

let preferredTheme = getPreferredTheme()

function updateTheme() {
    preferredTheme = getPreferredTheme()
    document.getRootNode().setAttribute("theme", preferredTheme)
}
updateTheme()
function setTheme(theme) {
    window.localStorage.setItem("theme", theme)
    updateTheme()
}
function resetTheme() {
    window.localStorage.removeItem("theme")
    updateTheme()
}