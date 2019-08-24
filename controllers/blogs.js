const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

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
        const body = request.body
        const token = request.token

        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (!body.title || !body.url) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        let user = await User.findById({ _id: request.body.user })

        const blog = new Blog(
            { ...request.body,
                likes: request.body.likes? request.body.likes: 0,
                user: request.body.user
            })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        let result = await Blog
            .findById({ _id: savedBlog._id })
            .populate('user', { username: true, name: true })

        response.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        const blog = await Blog.findById({ _id: request.params.id })

        if (blog === null) {
            return response.status(201).json({ error: 'resource not found' })
        }

        if (blog.user.toString() === decodedToken.id) {
            const user = await User.findOne({ username: decodedToken.username })
            user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)

            await user.save()

            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()

        } else {
            return response.status(401).json({ error: 'unauthorized' })
        }
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
        console.log(request.body)
        const blog = {
            user: request.body.user,
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
        }

        const updatedBlog = await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
            .populate('user', { username: true, name: true })

        response.json(updatedBlog)

    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter