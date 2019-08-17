require('dotenv').config()

const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
jest.setTimeout(20000)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.blogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())

    await Promise.all(promiseArray)
})

describe('blog api test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.blogs.length)
    })


    test('a valid blog can be added', async () => {
        const blog = {
            title: 'Hello World',
            author: 'John Chua',
            url: 'https://helloWorld.com/',
            likes: 80
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length + 1)

        const titles = result.map(n => n.title)
        expect(titles).toContain('Hello World')
    })


    test('blogs should contain id property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })


    test('a valid blog can be added if likes is missing', async () => {
        const blog = {
            title: 'Missing likes',
            author: 'Jarel Chua',
            url: 'https://SnakeWantsToEat.com/'
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length + 1)

        const titles = result.map(n => n.title)
        expect(titles).toContain('Missing likes')
    })


    test('a valid blog should not be added if contents are missing', async () => {
        const blog = {
            title: '',
            author: 'Alan John',
            url: '',
            likes: 90
        }

        const response = await api.post('/api/blogs').send(blog)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('content missing')

        const result = await helper.getAllBlogsInDB()
        expect(result.length).toBe(helper.blogs.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})