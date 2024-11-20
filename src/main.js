const CLIENT_ID = 5961078402983709965
const SCOPES = ["openid", "profile", "universe-messaging-service:publish"]

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
    document.documentElement.setAttribute("theme", preferredTheme)
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

function randomString(length) {
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    const string = Array.from(array, v => v.toString(16)).join("")
    return "00".substring(string.length) + string
}

function sha256(plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest("SHA-256", data)
}

function base64urlencode(v) {
    let str = ""
    let bytes = new Uint8Array(v)
    let length = bytes.byteLength
    for (let i = 0; i < length; i++) {
        str += String.fromCharCode(bytes[i])
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "-")
        .replace(/=+$/, "-")
}

async function challengeFromVerifier(v) {
    const hashed = await sha256(v)
    return base64urlencode(hashed)
}

document.getElementById("loginbutton").addEventListener("click", async event => {
    const verifier = randomString(32)
    const state = randomString(32)
    const challenge = await challengeFromVerifier(verifier)

    window.localStorage.setItem("verifier", verifier)
    window.localStorage.setItem("state", state)

    location.assign(`https://apis.roblox.com/oauth/v1/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent("localhost:5500/redirect")}&scope=${encodeURIComponent(SCOPES.join(" "))}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&state=${state}`)
})