const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
    userName: String,
    deviceKey: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('Device', deviceSchema)