const { usernameUnique, usernameExists } = require("./middleware")

const router = require("express").Router()

router.post("/register", usernameUnique, (req, res, next) => {
    res.end()
})

router.post("/login", usernameExists, (req, res, next) => {
    res.end()
})

module.exports = router