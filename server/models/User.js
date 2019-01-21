const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        name   : String,
        email : String,
        firstContact   : Date,
        emailType : String,
        sold : Boolean,
        owner : String,
        country : String
})

const User = mongoose.model("User", userSchema)
module.exports = User