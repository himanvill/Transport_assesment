const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const user = new mongoose.Schema({
    email: { type: String, required:true},
    password: {type:String, required:true}
})

let User  = new mongoose.model('User', user)
module.exports = User

