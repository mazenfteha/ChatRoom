const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} =require('validator') 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email'] 
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The password should be at least 6 characters long']
    },
})

// 12345 ==addsalt==> 12345abc ==hash function =>asda56s16f5165df165as1f65a1f5sa1f
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log('before save', this)
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User