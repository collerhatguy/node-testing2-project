const db = require("../../data/dbConfig")

const getAll = () => db('users')

const add = user => {
    return null
}
const checkUsernameExists = username => {
    return null
}
const checkUsernameUnique = username => {
    return null
}

module.exports = {
    getAll,
    add,
    checkUsernameExists,
    checkUsernameUnique
}