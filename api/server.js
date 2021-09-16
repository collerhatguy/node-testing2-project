const express = require("express")
const cors = require("cors")
const server = express()
const userRouter = require("./users/router")

server.use(express.json())
server.use(cors())
server.use("/api/users", userRouter)

server.use((err, req, res, next) => {
    const { status, message, stack } = err
    res.status(status || 500).json({
        message,
        stack
    })
})

module.exports = server