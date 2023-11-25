const express = require('express')

const Task = require('../models/TaskSchema')
const auth = require('../middlewares/auth')

const router = express.Router()


router.get('/', (req, res) => {
    res.send("TaskROuter")
})
// CRUD

router.post('/create-task', auth, async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const owner = req.userId;

        const newTask = new Task({
            title,
            description,
            owner
        })

        await newTask.save();
        return res.status(201).json(
            newTask
        )
    }
    catch (err) {
        next(err);
    }
});


router.get('/get-user-tasks', auth, async (req, res, next) => {
    try {
        const tasks = await Task.find({ owner: req.userId });
        return res.status(200).json(
            tasks
        )

    }
    catch (err) {
        next(err);
    }
});


router.post('/get-task-by-id/', auth, async (req, res, next) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findOne({ _id: taskId, owner: req.userId });
        
        return res.status(200).json(
            task
            )
            if (!task) { return res.status(404).json({ message: "Task not found" }) }
    }
    catch (err) {
        next(err);
    }
});


router.post('/update-task', auth, async (req, res, next) => {


    try {

        const owner = req.userId;
        const { taskId , taskData} = req.body;
        const task = await Task.findOneAndUpdate({ _id: taskId, owner }, taskData, { new: true });

        if (!task) {
            let err = new Error('Task not found!');
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json(
            task
        )
    }
    catch (err) {
        next(err);
    }
});


router.post('/delete-task', auth, async (req, res, next) => {
    try {
        const { taskId } = req.body;
        const owner = req.userId;

        await Task.findOneAndDelete({ _id: taskId, owner });
        return res.status(200).send(
            'Task deleted successfully!')

    }
    catch (err) {
        next(err);
    }
})

module.exports = router

