// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./routes/api')
const bodyParser = require('body-parser')
var cors = require ('cors');
const serverless = require("serverless-http");
const router = express.Router()
const User = require('./models/User')
const Analytics = require('./scripts/Analytics')

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tomerDB', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));


router.get('/users', (req, res)  => {
    console.log("In users")
    User
    .find({})
    .exec((err, users) =>  {
        res.json({ data : users})
    })
})

router.post('/user',(req, res)  => {
    let data = req.body
    let user = new User(data)
    user.save()
    res.json({ data : user})
})

router.put('/user/:id',(req, res)  => {
    let dataTochange = req.body
    let id = req.params.id
    User.findByIdAndUpdate(id,{$set:dataTochange}, { new: true }, 
         (err, user) =>  {
        if (err) return handleError(err);
        res.json({ data : user});
      })
})

router.get('/analytics',(req, res)  => {
    User
    .find({})
    .exec( (err, users) =>  {
        const newAnalytics = new Analytics(users)
        newAnalytics.findBestSellers()
        newAnalytics.findBestCountries()
        newAnalytics.findLastDate()
        newAnalytics.findEmailLast()
        newAnalytics.findOutstandingClients()
        newAnalytics.salesSinceDate()
        newAnalytics.clientAcquisition()
        newAnalytics.clerData()
        res.json({ data : newAnalytics})
    })
})

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


// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/.netlify/functions/server', router)

module.exports = app;
module.exports.handler = serverless(app);

