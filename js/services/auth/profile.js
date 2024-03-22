export function profileGoogle() {
    getRedirectResult(auth, provider)
        .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken

            const user = result.user
            console.log(user)
        }).catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            
            console.log(errorMessage)

            const email = error.customData.email

            const credential = GoogleAuthProvider.credentialFromError(error)
        })
}

export function profileAuth() {
    onAuthStateChanged(user => {
        console.log(user => {
            if(user) console.log(user)
        })
    })
}