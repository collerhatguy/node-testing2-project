const Users = require("../modal")
const db = require("../../../data/dbConfig")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe("modal testing", () => {
    test("returns array of users", async () => {
        const data = await Users.getAll()
        expect(data).toMatchObject([
            {user_id: 1, username: 'buttercup', password: 'green'},
            {user_id: 2, username: 'blossom', password: 'pink'},
            {user_id: 3, username: 'bubbles', password: 'blue'}
        ])
    })
})