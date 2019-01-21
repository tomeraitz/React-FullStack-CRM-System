const express = require('express')
const router = express.Router()
// const moment = require('moment');
const User = require('../models/User')
const Analytics = require('../scripts/Analytics')



router.get('/users', function (req, res) {
    User
    .find({})
    .exec(function (err, users) {
        res.send(users)
    })
})

router.post('/user', function (req, res) {
    let data = req.body
    let user = new User(data)
    user.save()
    res.send(user)
})

router.put('/user/:id', function (req, res) {
    let dataTochange = req.body
    console.log(dataTochange)
    let id = req.params.id
    User.findByIdAndUpdate(id,{$set:dataTochange}, { new: true }, 
        function (err, user) {
        if (err) return handleError(err);
        res.send(user);
      })
})

router.get('/analytics', function (req, res) {
    User
    .find({})
    .exec(function (err, users) {
        const newAnalytics = new Analytics(users)
        newAnalytics.findBestSellers()
        newAnalytics.findBestCountries()
        newAnalytics.findLastDate()
        newAnalytics.findEmailLast()
        newAnalytics.findOutstandingClients()
        newAnalytics.salesSinceDate()
        newAnalytics.clientAcquisition()
        newAnalytics.clerData()
        res.send(newAnalytics)
    })
})


module.exports = router