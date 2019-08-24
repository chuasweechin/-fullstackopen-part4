const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (body.username  === undefined || body.password === undefined ) {
            return response.status(401).json({ error: 'missing username or password' })
        }

        const user = await User.findOne({ username: body.username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

        if (passwordCorrect === false || user === null) {
            return response.status(401).json({ error: 'incorrect username or password' })
        }

        const tokenPayload= {
            username: user.username,
            name: user.name,
            id: user._id,
        }

        const token = jwt.sign(tokenPayload, process.env.SECRET)

        return response.status(200).json({ token })

    } catch (err) {
        next(err)
    }
})

module.exports = loginRouter