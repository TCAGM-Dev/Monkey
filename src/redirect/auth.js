const urlSearchParams = new URLSearchParams(location.search)

async function handleAuthRedirect() {
    const authCode = urlSearchParams.get("code")
    if (authCode == null) return

    const state = urlSearchParams.get("state")
    if (state == null) return

    const savedState = window.localStorage.getItem("state")
    if (savedState == null) return

    if (state != savedState) return

    const verifier = window.localStorage.getItem("verifier")
    if (verifier == null) return

    fetch("", {
        method: "POST",
        body: stringifyFormData({
            code: code,
            code_verifier: verifier,
            grant_type: "authorization_code",
            
        })
    })
}

handleAuthRedirect()