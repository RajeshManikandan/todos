const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const mongooseUrl = require('./setup/myUrl').urls.mongoose;
// ... other imports
const path = require('path');

//Middleware for Body Parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Connect to Database
mongoose
    .connect(mongooseUrl, { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('dbConnectError : ' + err));

mongoose.set('useFindAndModify', false);

//Importing Routes
const todo = require('./routes/api/todo');
const category = require('./routes/api/category');

//@Route    GET
//ACCESS    PUBLIC
//DESC      Sample route for testing
app.get('/', (req, res) => {
    res.send('Server is Running');
});

//Setting Up Routes
app.use('/api/todo', todo);
app.use('/api/category', category);

if (process.env.NODE_ENV === 'production') {
    // ... other app.use middleware
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    // ...
    // Right before your app.listen(), add this:
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//listening to port
const port = process.env.port | 8000;
app.listen(port, () => console.log('server is running in port ' + port));
