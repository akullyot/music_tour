//Dependencies
const stages = require('express').Router();
const { response } = require('express');
const db = require('../models');
const { Stage, Event } = db 
const { Op } = require('sequelize');

//Find all stages
stages.get('/', async (req, res) => {
    try {
        const foundstages = await Stage.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundstages)
    } catch (err) {
        res.status(500).json(err)
    }
})

//find a specific Stage
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            include:{ 
                model: Event, 
                as: "events",
                through: { attributes: [] }
            },
            order: [
                [{ model: Event, as: "events" }, 'date', 'ASC'],
            ]
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})
//create an Stage
stages.post('/', async (req,res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: "successfully create a new Stage",
            data: newStage
        });
    } catch (err) {
        res.status(500).json(err)   
    }
});

//update an Stage
stages.put('/:id', async (req,res) => {
    try {
        const updatedstages = await Stage.update(req.body, {where: {Stage_id : req.params.Stage_id}});
        res.status(200).json({message : `successfully updated ${updatedstages} Stage(s)`});
    } catch (err) {
        res.status(500).json(err);   
    }
});

//delete an Stage
stages.delete('/:id', async (req,res) => {
    try {
        const deletedstages = await Band.destroy({
            where: {Stage_id: req.params.Stage_id}
        });
        res.status(200).json({
            message: `successfully deleted ${deletedstages} Stage(s)`
        });
    } catch (err) {
        res.status(500).json(err);  
    }
});

module.exports = stages;
