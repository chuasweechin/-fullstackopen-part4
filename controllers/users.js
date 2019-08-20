const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: true, url: true, author: true, likes: true })
        response.json(users)
    } catch (err) {
        next(err)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        if (!request.body.username || !request.body.password || !request.body.name) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        if (request.body.username.length < 4) {
            return response.status(400).json({
                error: 'username should be at least 3 characters long'
            })
        }

        if (request.body.password.length < 4) {
            return response.status(400).json({
                error: 'password should be at least 3 characters long'
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

        const user = new User({
            username: request.body.username,
            passwordHash: passwordHash,
            name: request.body.name
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)

    } catch (err) {
        next(err)
    }
})

module.exports = usersRouter