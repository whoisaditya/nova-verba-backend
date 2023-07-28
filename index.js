const express = require('express');
const app = express();
const port = process.env.PORT || 3000

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())

const dotenv = require('dotenv');
dotenv.config();
//const User = require('.Backend//api/models/user');

const mongoose = require('mongoose');

const User = require('./api/models/user');

const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connection estabislished with MongoDB');
    })
    .catch(error => console.error(error.message));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log("started");

app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method :', req.method);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Nova Verba Backend Up and Running, Refer Documentation for Use'
    })
})

app.use("/user", require("./api/routers/user"));

app.listen(port, () => {
    console.log('Server Up and Running at Port')
})

module.exports = app;