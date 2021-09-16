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
    const buttercupTest = {
        user_id: 1, 
        username: 'buttercup', 
        password: 'green'
    }
    const blossomTest = {
        user_id: 2, 
        username: 'blossom', 
        password: 'pink'
    }
    const bubblesTest = {
        user_id: 3, 
        username: 'bubbles', 
        password: 'blue'
    }
    const bunnyTest = {
        user_id: 4, 
        username: 'bunny', 
        password: 'purple'
    }
    test("returns array of users", async () => {
        const data = await Users.getAll()
        expect(data).toMatchObject([
            buttercupTest,
            blossomTest,
            bubblesTest
        ])
    })
    test("find user by id", async () => {
        const buttercup = await Users.getById(1)
        expect(buttercup).toMatchObject(buttercupTest)
        const blossom = await Users.getById(2)
        expect(blossom).toMatchObject(blossomTest)
        const bubbles = await Users.getById(3)
        expect(bubbles).toMatchObject(bubblesTest)
    })  
    test("insert user", async () => {
        const input = { username: 'bunny', password: 'purple' }
        const newUser = await Users.add(input)
        expect(newUser).toMatchObject({ ...input, user_id: 4 })
        const allUsers = await Users.getAll()
        expect(allUsers).toHaveLength(4)
        const bunny = await Users.getById(4)
        expect(bunny).toMatchObject(bunnyTest)
    })  
    test("username exists check", async () => {
        const input = buttercupTest.username
        const user = await Users.checkUsernameExists(input)
        expect(user).toMatchObject(buttercupTest)
        const mojojojo = await Users.checkUsernameExists("mojojojo")
        expect(mojojojo).not.toBeDefined()
    })
})