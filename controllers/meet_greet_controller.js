const meetGreet = require('express').Router()
const db = require('../models')
const { MeetGreet } = db
const { Op } = require('sequelize')

// FIND ALL MEET & GREETS
meetGreet.get('/', async (req, res) => {
    try {
        const findMeets = await MeetGreet.findAll({
            order: [ [ 'event_id', 'ASC' ] ],
            where: {
                event_id: req.query.id ? req.query.id : { [Op.ne]: null }
            }
        })
        res.status(200).json(findMeets)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC MEET & GREET
meetGreet.get('/:id', async (req, res) => {
    try {
        const findMeet = await MeetGreet.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(findMeet)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A MEET & GREET
meetGreet.post('/', async (req, res) => {
    try {
        const newMeet = await MeetGreet.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new meet & greet',
            data: newMeet
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A MEET & GREET
meetGreet.put('/:id', async (req, res) => {
    try {
        const updatedMeet = await MeetGreet.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedMeet} meet & greet(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A MEET & GREET
meetGreet.delete('/:id', async (req, res) => {
    try {
        const deletedMeet = await MeetGreet.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedMeet} meet & greet(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = meetGreet