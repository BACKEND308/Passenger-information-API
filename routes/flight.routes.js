import express from 'express';
import Flight from '../models/Flight.js';

const router = express.Router();

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new flight
router.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a flight by ID
router.put('/:id', async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a flight by ID
router.delete('/:id', async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
