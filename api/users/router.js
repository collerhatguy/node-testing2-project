const { usernameExists, usernameUnique } = require("./middleware")
const Users = require("./modal")

const router = require("express").Router()

router.post("/register", usernameUnique, (req, res, next) => {
    Users.add(req.user).then(user => 
        res.status(201).json(user)    
    ).catch(next)
})

router.post("/login", usernameExists, (req, res, next) => {
    const { user, body } = req
    if (user.password === body.password) {
        res.status(200).json(user)
    } else {
        next({ status: 404, message: "invalid credentials" })
    }
})

module.exports = router