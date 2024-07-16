const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all users
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs',  { url: 1, title: 1, author: 1 })
    response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

usersRouter.get('/:id', async (request, response) => {
    const blog = await User.findById(request.params.id)
    response.json(blog)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({ error: 'username and password are required' })
    }

    if (username.length < 3) {
        return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }

    if (password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter