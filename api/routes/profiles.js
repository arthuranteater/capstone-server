const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Profile = require('../models/profiles')

router.get('/', (req, res, next) => {
    Profile.find().exec().then(result => {
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
    const profile = new Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        petName: req.body.petName,
        activateKey: req.body.activateKey,
        petName2: req.body.petName2,
        activateKey2: req.body.activateKey2,
    })
    profile.save().then(result => {
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
    Profile.findById(id).exec().then(doc => {
        console.log("from db", doc)
        if (doc) {
            res.status(200).json(doc)
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

