const stage = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// FIND ALL STAGES
stage.get('/', async (req, res) => {
    try {
        const findStages = await Stage.findAll({
            order: [['stage_id', 'ASC']],
            where: {
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(findStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC STAGE
stage.get('/:id', async (req, res) => {
    try {
        const findStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(findStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A STAGE
stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A STAGE
stage.put('/:id', async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A BAND
stage.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stage