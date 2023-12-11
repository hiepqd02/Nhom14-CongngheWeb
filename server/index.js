const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const userRouters = require('./routes/userRoutes')
// const taskRouters = require('./routes/taskRoute')
const auth = require('./Middlewares/auth');
const unless =require('express-unless')
require('dotenv').config();
require('./db');

const PORT = 8000;
app.use(bodyParser.json());


// AUTH VERIFICATION AND UNLESS

auth.verifyToken.unless = unless

app.use(
	auth.verifyToken.unless({
		path: [
			{ url: '/user/login', method: ['POST'] },
			{ url: '/user/register', method: ['POST'] },
		],
	})
);

app.use('/user', userRouters);

// Board, list, card here
// app.use('/tasks', taskRouters)


app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    })
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});