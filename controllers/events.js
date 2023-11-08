//Dependencies
const events = require('express').Router();
const { response } = require('express');
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize');

//Find all events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

//find a specific event
events.get('/:id', async (req,res) => {
    try {
        const foundEvent = await Band.findOne({
            where: {event_id: req.params.event_id}
        });
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).json(err)
    }
});
//create an event
events.post('/', async (req,res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: "successfully create a new event",
            data: newEvent
        });
    } catch (err) {
        res.status(500).json(err)   
    }
});

//update an event
events.put('/:id', async (req,res) => {
    try {
        const updatedEvents = await Event.update(req.body, {where: {event_id : req.params.event_id}});
        res.status(200).json({message : `successfully updated ${updatedEvents} event(s)`});
    } catch (err) {
        res.status(500).json(err);   
    }
});

//delete an event
events.delete('/:id', async (req,res) => {
    try {
        const deletedEvents = await Band.destroy({
            where: {event_id: req.params.event_id}
        });
        res.status(200).json({
            message: `successfully deleted ${deletedEvents} event(s)`
        });
    } catch (err) {
        res.status(500).json(err);  
    }
});

module.exports = events;
