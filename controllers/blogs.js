const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: true, name: true })
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

        let users = await User.find()

        const blog = new Blog(
            { ...request.body,
                likes: request.body.likes? request.body.likes: 0,
                user: users[0]._id
            })

        const savedBlog = await blog.save()

        users[0].blogs = users[0].blogs.concat(savedBlog._id)
        await users[0].save()

        response.status(201).json(savedBlog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        if (!request.body.likes || !request.body.title || !request.body.author || !request.body.url) {
            return request.status(400).json({
                error: 'content missing'
            })
        }

        const blog = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())

    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter