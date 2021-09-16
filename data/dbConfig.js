const config = require("../knexfile")
const knex = require("knex")
const enviornment = 'development'

const db =  knex(config[enviornment])

module.exports = db