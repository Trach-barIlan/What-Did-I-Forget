const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('destinationId');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching event with ID:', req.params.id);
    const event = await Event.findOne({ intId: parseInt(req.params.id) })
      .populate('destinationId')
      .exec();
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    console.log('Found event:', event);
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    console.log('Received event data:', req.body);
    
    const event = new Event({
      title: req.body.title,
      intId: req.body.intId,
      destinationId: req.body.destinationId,
      start: req.body.start,
      end: req.body.end
    });

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors 
    });
  }
});

module.exports = router;