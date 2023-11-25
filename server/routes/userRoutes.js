const express = require('express')
const User = require('../models/UserSchema')
const router = express.Router()


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const auth = require('../middlewares/auth')


router.get('/test',auth, (req, res) => {
    res.send({user:req.user})
})

// register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (existingUser) {
            let err = new Error('User already exists!');
            err.statusCode = 400;
            throw err;
        }

        const user = await User({ name, email, password })
        await user.save()
        
        res.status(201).send({ user, message: "User created" })
    } catch (err) {
        res.status(400).send({ error: err })

    }
})
// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })


        if (!user) {
            throw new Error('Unable to login, user not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login, wrong password')
        }
        const token = jwt.sign({
            _id:user._id.toString()
        }, process.env.JWT_SECRET_KEY)

        res.send({user, token, message:"Login successful"})

    } catch (err) {
        res.status(400).send({ error: err })
    }
})
module.exports = router

