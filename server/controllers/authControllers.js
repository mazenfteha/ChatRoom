const User = require('../models/User')
const jwt = require('jsonwebtoken')
const alertError  = require('../error/handleSignupErrors')

const maxAge = 5 * 24 * 60 * 60
const createJWT = id => {
    return jwt.sign({ id }, 'chatroom secret', {
        expiresIn:maxAge
    })
}
module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({name, email, password})
        const token = createJWT(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user })
    } catch (error) {
        let errors = alertError(error)
        res.status(400).json(errors)
    }
}

module.exports.login = async (req, res) => {
    const {email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createJWT(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user })
    } catch (error) {
        let errors = alertError(error)
        res.status(400).json(errors)
    }
}

module.exports.verifyuser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, 'chatroom secret', async (err, decodeToken) => {
            if(err) {
                console.log(err.message)
            } else {
                let user = await User.findById(decodeToken.id)
                res.json(user)
                next()
            }
        })
    } else {
        next()
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 })
    res.status(200).json({ logout:true })
}