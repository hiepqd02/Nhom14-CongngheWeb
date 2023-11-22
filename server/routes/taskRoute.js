const express = require('express')

const Task = require('../models/TaskSchema')

const router = express.Router()


router.get('/', (req, res)=>{
    res.send("TaskROuter")
})
// register
// login
module.exports = router

