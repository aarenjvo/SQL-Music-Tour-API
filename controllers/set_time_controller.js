const setTime = require('express').Router()
const db = require('../models')
const { SetTime } = db
const { Op } = require('sequelize')

// FIND ALL SET TIMES
setTime.get('/', async (req, res) => {
    try {
        const findSetTimes = await SetTime.findAll({
            order: [['start_time', 'ASC']],
            where: {
                set_time_id: req.query.id ? req.query.id : { [Op.ne]: null }
            }
        })
        res.status(200).json(findSetTimes)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC SET TIME
setTime.get('/:id', async (req, res) => {
    try {
        const findSetTime = await SetTime.findOne({
            where: { set_time_id: req.params.id }
        })
        res.status(200).json(findSetTime)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A SET TIME
setTime.post('/', async (req, res) => {
    try {
        const newSetTime = await SetTime.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new set time!',
            data: newSetTime
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A SET TIME
setTime.put('/:id', async (req, res) => {
    try {
        const updatedSetTime = await SetTime.update(req.body, {
            where: {
                set_time_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedSetTime} set time(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

setTime.delete('/:id', async (req, res) => {
    try {
        const deletedSetTime = await SetTime.destroy({
            where: {
                set_time_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedSetTime} set time(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = setTime
