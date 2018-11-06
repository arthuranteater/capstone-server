const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    petName: String,
    activateKey: String,
    petName2: String,
    activateKey2: String
})

module.exports = mongoose.model('Profile', profileSchema)