const express = require('express')

const User = require('../models/UserSchema')

const router = express.Router()


router.get('/', (req, res)=>{
    res.send("UserRouter")
})
// CRUD
module.exports = router

