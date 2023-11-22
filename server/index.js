const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const userRouters = require('./routes/userRoutes')
const taskRouters = require('./routes/taskRoute')

require('dotenv').config();
require('./db');

const PORT = 8000;
app.use(bodyParser.json());

app.use('/users', userRouters);
app.use('/tasks', taskRouters)


app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    })
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});