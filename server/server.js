// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./routes/api')
const bodyParser = require('body-parser')
var cors = require ('cors');
const serverless = require("serverless-http");

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tomerDB', { useNewUrlParser: true })

// app.use(cors({
//     origin:['http://localhost:3000'],
//     credentials:true
// }));

// app.use(function (req, res, next) {

//     res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials',"true");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
//   });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/.netlify/functions/api', api)

module.exports = app;
module.exports.handler = serverless(app);
