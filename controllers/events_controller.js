const event = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// FIND ALL EVENTS
event.get('/', async (req, res) => {
    try {
        const findEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(findEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC EVENT
event.get('/:id', async (req, res) => {
    try {
        const findAnEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(findAnEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN EVENT
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE AN EVENT
event.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A BAND
event.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = event