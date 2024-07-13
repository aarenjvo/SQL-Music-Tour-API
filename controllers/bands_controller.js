// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const { id } = req.params
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND BY ID
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: MeetGreet,
                    as: 'meet_greet',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } },
                        attributes: { exclude: ['event_id'] }
                    },
                    attributes: { exclude: ['band_id', 'event_id'] }
                },
                {
                    model: SetTime,
                    as: 'set_time',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } },
                        attributes: { exclude: ['event_id'] }
                    },
                    attributes: { exclude: ['band_id', 'event_id'] }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND BY NAME
bands.get('/name/:name', async (req, res) => {
    try {
        const foundBandByName = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: 'meet_greet',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } },
                        attributes: { exclude: ['event_id'] }
                    },
                    attributes: { exclude: ['band_id', 'event_id'] }
                },
                {
                    model: SetTime,
                    as: 'set_time',
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } },
                        attributes: { exclude: ['event_id'] }
                    },
                    attributes: { exclude: ['band_id', 'event_id'] }
                }
            ]
        })
        res.status(200).json(foundBandByName)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = bands