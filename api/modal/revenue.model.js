const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const revenue = new mongoose.Schema({
    email: { type: String},
    company_name: { type: String},
    quarter1: { type: Number},
    quarter2: { type: Number},
    quarter3: { type: Number}
})

let RevenueData  = new mongoose.model('RevenueData', revenue)
module.exports = RevenueData
