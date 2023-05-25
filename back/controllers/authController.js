export const login = (req, res) => {
    console.log(`User logged in: ${req.user.username}`);

    res.send();
}

export const logout = (req, res) => {
    let username = req.user.username

    console.log(`Logging out user: ${username}`)

    req.session.destroy((err) => {
        if (err) {
            console.error(`Error destroying session`, err)
        } else {
            console.log(`User logged out: ${username}`)
        }
        res.send();
    })
};