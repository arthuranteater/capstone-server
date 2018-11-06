const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Device = require('../models/devices')

router.get('/', (req, res, next) => {
    Device.find().exec().then(result => {
        console.log(result)
        if (result.length >= 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "No entries" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
})

router.post('/', (req, res, next) => {
    device = new Device({
        _id: new mongoose.Types.ObjectId(),
        userName: req.params.body.userName,
        deviceKey: req.params.body.deviceKey,
        latitude: req.params.body.latitude,
        longitude: req.params.body.longitude,
    })
    device.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'adding profile',
            createProfile: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Profile.findById(id).exec().then(result => {
        console.log("from db", result)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "Not found" })
        }

    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })

})

router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Profile.update({ _id: id }, { $set: updateOps }).exec().then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Profile.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
})



module.exports = router