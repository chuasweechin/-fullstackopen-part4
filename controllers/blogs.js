const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (err) {
        next(err)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        if (!request.body.title || !request.body.url) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const blog = new Blog(
            { ...request.body,
                likes: request.body.likes? request.body.likes: 0
            })

        const savedBlog = await blog.save()

        response.status(201).json(savedBlog)
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter