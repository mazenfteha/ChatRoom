const User = require('../models/User')
const alertError  = require('../error/handleSignupErrors')

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({name, email, password})
        res.status(201).json({ user })
    } catch (error) {
        let errors = alertError(error)
        res.status(400).json(errors)
    }
}

module.exports.login = (req, res) => {
    res.send('login')
}

module.exports.logout = (req, res) => {
    res.send('logout')
}