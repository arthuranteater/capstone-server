const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    userName: String,
    deviceKey: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('Device', deviceSchema)