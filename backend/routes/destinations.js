const express = require('express');
const Destination = require('../models/Destination');
const router = express.Router();

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new destination
router.post('/', async (req, res) => {
    try {
      // Find the highest intId in the collection
      const highestDestination = await Destination.findOne().sort('-intId');
      const nextIntId = (highestDestination?.intId || 0) + 1;
  
      const destination = new Destination({
        ...req.body,
        intId: nextIntId
      });
      
      const savedDestination = await destination.save();
      res.status(201).json(savedDestination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
