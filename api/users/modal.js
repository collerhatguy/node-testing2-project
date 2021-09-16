const db = require("../../data/dbConfig")

const getAll = () => db('users')

const getById = user_id => {
    return getAll()
        .where({ user_id })
        .first()
}

const add = user => {
    return getAll()
        .insert(user)
        .then(([id]) => getById(id))
}
const checkUsernameExists = username => {
    return getAll()
        .where({ username })
        .first()
}

module.exports = {
    getAll,
    getById,
    add,
    checkUsernameExists,
}