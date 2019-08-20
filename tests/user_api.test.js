require('dotenv').config()

const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
jest.setTimeout(20000)

beforeEach(async () => {
    await User.deleteMany({})

    const promiseArray = helper.users.map(u => api.post('/api/users').send(u))
    await Promise.all(promiseArray)
})

describe('user api test', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(helper.users.length)
    })

    test('a valid user can be added', async () => {
        const user = {
            username: 'monk',
            password: '654321',
            name: 'pole'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await helper.getAllUsersInDB()
        expect(result.length).toBe(helper.users.length + 1)

        const usernames = result.map(u => u.username)
        expect(usernames).toContain('monk')
    })

    test('a user should not be added if username is less than 4 characters', async () => {
        const user = {
            username: 'ace',
            password: '123456',
            name: 'spade'
        }

        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('username should be at least 3 characters long')

        const result = await helper.getAllUsersInDB()
        expect(result.length).toBe(helper.users.length)
    })

    test('a user should not be added if password is less than 4 characters', async () => {
        const user = {
            username: 'kate',
            password: '123',
            name: 'spade'
        }

        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('password should be at least 3 characters long')

        const result = await helper.getAllUsersInDB()
        expect(result.length).toBe(helper.users.length)
    })

    test('a user should not be added if username already exist', async () => {
        const user = {
            username: 'warrior',
            password: '098765',
            name: 'honor'
        }

        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)

        const result = await helper.getAllUsersInDB()
        expect(result.length).toBe(helper.users.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})