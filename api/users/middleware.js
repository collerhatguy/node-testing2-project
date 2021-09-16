const User = require("./modal")

const usernameExists = async (req, res, next) => {
    const { username } = req.body
    const existingUser = await User.checkUsernameExists(username)
    if (existingUser) {
        req.user = existingUser
        next()
    } else {
        next({ status: 404, message: "that username doesnt exist" })
    }
}

const usernameUnique = async (req, res, next) => {
    const { username } = req.body
    const existingUser = await User.checkUsernameExists(username)
    if (existingUser) {
        next({ status: 404, message: "that username already exists" })
    } else {
        req.user = req.body
        next()
    }
}

module.exports = {
    usernameExists,
    usernameUnique
}