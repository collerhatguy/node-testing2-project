const express = require("express")
const server = express()

server.use(express.json())

server.use((err, req, res, next) => { 
    const { status, message, stack } = err
    res.status(status || 500).json({
        message,
        stack
    })
})

module.exports = server