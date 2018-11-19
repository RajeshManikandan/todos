const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongooseUrl = require('./setup/myUrl').urls.mongoose;

//Middleware for Body Parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Connect to Database
mongoose
    .connect(mongooseUrl, { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('dbConnectError : ' + err));

//Importing Routes
const todo = require('./routes/api/todo');

//@Route    GET
//ACCESS    PUBLIC
//DESC      Sample route for testing
app.get('/', (req, res) => {
    res.send('Server is Running');
});

//Setting Up Routes
app.use('/api', todo);

//listening to port
const port = process.env.port | 8000;
app.listen(port, () => console.log('server is running in port ' + port));
