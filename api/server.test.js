const server = require("./server")
const request = require("supertest")
const db = require("../data/dbConfig")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe('endpoint testing', () => {
    const blossom = {
        username: "blossom", 
        password: "pink"
    }
    const bunny = {
        username: "bunny", 
        password: "purple"
    }

    describe("[POST] /api/users/register", () => {
        test("register works with unique name", async () => {
            const res = await request(server)
                .post("/api/users/register")
                .send({ username: "bunny", password: "purple" })
            expect(res.status).toBe(201)
            expect(res.body).toMatchObject({
                user_id: 4, 
                username: 'bunny', 
                password: 'purple'
            })
        })
        test("register detect already existing name", async () => {
            const res = await request(server)
                .post("/api/users/register")
                .send({ username: "blossom", password: "pink" })
            expect(res.status).toBe(404)
            expect(res.body.message.includes("already exists")).toBeTruthy()
        })
    })
    describe('[POST] /api/users/login', () => {
        test("works with existing username and password", async () => {
            const res = await request(server).post("/api/users/login").send(blossom)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({ ...blossom, user_id: 2 })
        })
        test("gives right error message", async () => {
            const res = await request(server).post("/api/users/login").send(bunny)
            expect(res.status).toBe(404)
            expect(res.body.message.includes("invalid credentials")).toBe(false)
        })
    })
    
})
