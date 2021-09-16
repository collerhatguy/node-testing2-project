
exports.up = async function(knex) {
    await knex.schema.createTable("users", users => {
        users.increments("user_id")
        users.string("password").notNullable()
        users.string("username")
            .notNullable()
            .unique()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
